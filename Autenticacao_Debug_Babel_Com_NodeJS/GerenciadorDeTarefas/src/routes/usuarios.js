import express from 'express';
import moment from 'moment';
import bcrypt from 'bcryptjs';

import models from '../models';
import { generateToken, checkTokenMiddleware } from '../utils/jwt';

const { Usuario } = models;

const router = express.Router();

const DATE_FORMAT = 'YYYY-MM-DD';
const SALT_ROUNDS = 12;

module.exports = {
    path: '/usuarios',
    router
};

/*
* Cadastro de usuário
*/

router.post('/', (request, response) => {
    const usuario = {
        nome: request.body.nome,
        email: request.body.email,
        nascimento: moment(request.body.nascimento, DATE_FORMAT, true),
        senha: bcrypt.hashSync(request.body.senha, SALT_ROUNDS),
    };
    Usuario.create(usuario)
        .then((_usuario) => {
            _usuario = _usuario.get({ plain: true });
            delete _usuario.senha;
            response.status(201).json(_usuario);
        }).catch( error => {
            console.error(error);
            if (error.errors.lenght) {
                if (error.errors[0].type === 'unique violation') {
                    response.status(412).json({
                        type: 'unique',
                        field: 'email'
                    });
                    return;
                }
            }
            response.status(400).send('Não foi possível inserir o usuário.');
        });
});

/*
* Consulta de usuário
*/

router.get('/:usuarioId', checkTokenMiddleware, (request, response) => {
    const { usuarioId } = request.params;
    const usuarioIdToken = request.decodedToken.id;
    if (usuarioId != usuarioIdToken) {
        response.status(401).send('Operação não autorizada.');
        return;
    }
    Usuario.findByPk(usuarioId)
        .then(usuario => {
            if (usuario){
                response.status(200).json(usuario);
            } else {
                response.status(404).send('Usuário não encontrado.');
            }
        }).catch(error => {
            console.error(error);
            response.status(400).send('Não foi possível consultar o usuário.');
        });
});

/*
* Login de usuário
*/

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
                token: generateToken(_usuario)
            });
        } else {
            response.status(401).send('E-mail ou senha incorretos.');
        }
    }).catch(error => {
        console.error(error);
        response.status(400).send();
    });
});

/*
 * Esses middleware foram substituídos pelos middlewres de ../utils/jwt.js 
 const checkAuth = (request, response, next) => {
     const token = request.header('x-access-token');
     try {
         const payload = jwt.verify(token, SECRET_KEY);
         request.decodedToken = payload;
         next();
     } catch (error) {
         response.status(401).send('Usuário não autorizado.');
     }
 };
 
 
 
 const SECRET_KEY = 'ayg$y-j?V5=mhN+tWIuvhJvJyx^?fR';
 
 const generateJwt = (payload) => {
     const token = jwt.sign(payload, SECRET_KEY);
     return token;
 }
 */

