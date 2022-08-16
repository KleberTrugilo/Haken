import express from 'express';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import models from '../models';
import { request } from 'express';
import { response } from 'express';

const router = express.Router();
const {Usuario} = models;


router.post('/', (request, response) => {
    const usuario = {
        nome: request.body.nome,
        email: request.body.email,
        senha: bcrypt.hashSync(request.body.senha, 10),
        nascimento: moment(request.body.nascimento, 'YYYY-MM-DD', true),
    };
    Usuario.create(usuario)
        .then(usuario => {
            response.status(201).json(usuario);
        }).catch( error => {
            console.error(error);
            response.status(400).send();
        })
});

router.post('/login', (request, response) => {
    const {email, senha} = request.body;
    Usuario.findOne({
        attributes: null,
        where: {
            email: email
        }    
    }).then(usuario => {
        if(usuario && bcrypt.compareSync(senha, usuario.senha.toString())) {
            const _usuario = usuario.get({ plain: true });
            delete _usuario.senha;
            response.status(200).json({
                token: generateJwt(_usuario)
            });
        } else {
            response.status(401).send('E-mail ou senha incorretos.');
        }
    }).catch(error => {
        console.error(error);
        response.status(400).send();
    });
});

const checkAuth = (request, response, next) => {
    const token = request.header('x-access-token');
    const payload = jwt.verify(token, SECRET_KEY);
    if (payload) {
        next();
    } else {
        response.status(401).send('Usuário não autorizado.');
    }
};

router.get('/:usuarioId', checkAuth, (request, response) => {
    const { usuarioId } = request.params;
    Usuario.findByPk(usuarioId)
        .then(usuario => {
            if (usuario){
                response.status(200).json(usuario);
            } else {
                response.status(404).send();
            }
        }).catch(error => {
            console.error(error);
            response.status(400).send();
        });
});

const SECRET_KEY = 'ayg$y-j?V5=mhN+tWIuvhJvJyx^?fR';

const generateJwt = (payload) => {
    const token = jwt.sign(payload, SECRET_KEY);
    return token;
}

export default {
    path: '/usuarios',
    router: router
};
