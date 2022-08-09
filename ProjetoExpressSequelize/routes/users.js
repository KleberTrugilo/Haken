const { request, response } = require('express');
const express = require('express');
const router = express.Router();

const models = require('../models');
const Usuario = models.Usuario;
const Tarefa = models.Tarefa;
const Op = models.Op;

/* GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.post('/', (request,response) => {
  const usuario = {
    nome: request.body.nome,
    email: request.body.email,
  }

  Usuario.create(usuario)
    .then((_usuario) => {
      response.status(201).json(_usuario);
    }).catch(error => {
      console.error(error);
      response.status(400).send();
    });
});

//http://localhost:3000/users/usuarioId
router.get('/:usuarioId', (request, response) => {
  const usuarioId = request.params.usuarioId;

  Usuario.findByPk(usuarioId, {
    attributes: ['id', 'nome', 'email'],
    include: [{
      model: Tarefa,
      required: false,
      attributes: ['id', 'titulo'],
    }]
  }).then(usuario => {
      if(usuario) {
        response.status(200).json(usuario);
      } else {
        response.status(404).send('Usuario não encontrado');
      }
    }).catch(error => {
      console.error(error);
      response.status(400).send();
    });
});

router.put('/:usuarioId', (request, response) => {
  const usuarioId = request.params.usuarioId;

  const usuario = {
    nome: request.body.nome,
    email: request.body.email,
  };

  Usuario.update(usuario, {
    where: {
      id: usuarioId,
    }
  }).then(resultado => {
    console.log('Update realizado', resultado);
    const registrosAfetados = resultado[0];
    if(registrosAfetados > 0) {
      return Usuario.findByPk(usuarioId);
    } else {
      response.status(404).send('Usuário não encontrado.');
    }
  }).then(usuario => {
    if(usuario) {
      response.status(200).json(usuario);
    }
  }).catch(error => {
    console.error(error);
    response.status(400).send();
  });
});

router.delete('/:usuarioId', (request,response) => {
  const usuarioId = request.params.usuarioId;

  Usuario.destroy({
    where: {
      id: usuarioId
    }
  }).then(registrosAfetados => {
    console.log('Usuários removidos', registrosAfetados)
    if(registrosAfetados > 0) {
      response.status(204).send();
    } else {
      response.status(404).send('Usuário não encontrado.');
    }
  }).catch(error => {
    console.error(error);
    response.status(400).send();
  });
});

// http://localhost:3000/user?nome=kleber
router.get('/', (request, response) => {
  const nome = request.query.nome;

  Usuario.findAll({
    attributes: ['id', 'nome', 'email'],
    where: {
      nome: {
        [Op.substring]: nome
        //$like: '%' + nome + '%'
      }
    },
    //limit: 2, //limita o número de registros q retornam
  }).then(usuarios => {
    response.status(200).json(usuarios);
  }).catch(error => {
    console.error(error);
    response.status(400).send();
  });
});

//http://localhost:3000/users/:usuarioId/tarefas
router.post('/:usuarioId/tarefas', (request, response) => {
  const usuarioId = request.params.usuarioId;
  
  const tarefa = {
    titulo: request.body.titulo,
    descricao: request.body.descricao,
    usuarioId: usuarioId,
  }

  Tarefa.create(tarefa)
    .then((_tarefa) => {
      console.log('Tarefa inserida com sucesso.');
      response.status(201).json(_tarefa);
    }).catch(error => {
      console.error(error);
      response.status(400).send();
    });
});

module.exports = router;
