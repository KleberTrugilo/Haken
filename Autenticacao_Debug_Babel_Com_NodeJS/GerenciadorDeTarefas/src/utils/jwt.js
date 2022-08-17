import { response } from 'express';
import { request } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'ayg$y-j?V5=mhN+tWIuvhJvJyx^?fR';

/**
 * Middleware que verifica a validade e decodifica o token de autenticação presente no header 'x-access-token'.
 * 
 * @param {request} req
 * @param {response} res
 * @param {next} next
 */

export const checkTokenMiddleware = (request, response, next) => {
    const token = request.header("x-access-token") || request.cookies("x-access-token");
    console.log(token);
    checkToken(token)
        .then(decoded => {
            request.decodedToken = decoded;
            next();
        }).catch(error => {
            console.error('Não foi possível decodificar o tokes', token, error);
            response.status(401).send();
        });
};

/**
 * Valida a autenticidade e decodifica o token.
 * 
 * @param {string} token
 * @return {Promise} 
 */

export const checkToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (error, decoded) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(decoded);
        });
    })
}

/**
 * Gera o token de autenticação para o usuário.
 * 
 * @param {object} usuario objeto plano contendo os dados do usuário.
 * @return {string} Token de autenticação.
 */

export const generateToken = (usuario) => {
    delete usuario.senha;

    let token = jwt.sign(usuario, SECRET_KEY, { encoding: 'UTF8'});

    return token;
}
