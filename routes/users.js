var express = require('express');
var router = express.Router();
const pg = require('pg');

// Abrindo conexão com o postgreSQL
const connectionString = 'postgres://postgres:1598951@localhost:5432/ProjetoFinal';
const pgClient = new pg.Client(connectionString);
pgClient.connect();

/*router.get('/', function(req, res, next) {
  res.send('iai');
});*/

// CRUD Usuario
// Create Usuario
router.post('/usuario', (req, res) => {
  pgClient
    .query(`insert into usuario(nome, email, username, passhash)
            values ('${req.body.nome}', '${req.body.email}', '${req.body.username}', '${req.body.passhash}')`)
    .then(result => res.send(result))
    .catch(e => res.send(e));
});

// Read todos Usuarios
router.get(`/usuarios`, (req, res, next) => {
  pgClient
  .query('SELECT * from usuario')
  .then(result => res.send(result.rows))
  .catch(e => res.send(e));
});

// Read usuario baseado no id
router.get(`/usuario/:id`, (req, res, next) => {
  pgClient
    .query(`SELECT * from usuario where id=${req.params.id}`)
    .then( result => res.send(result.rows.length > 0 ? result.rows : 'Usuário não existe'))
    .catch(e => res.send(e));
});

// Update Usuario

router.post('/usuario/:id', (req, res, next) => {
  if(!req.body.idInscritos && req.body.idFavoritos.length > 0) {
    pgClient
      .query(`update usuario set idFavoritos='${req.body.idFavoritos}' where id='${req.params.id}' `)
      .then(result => res.send(result))
      .catch(e => res.send(e));
  }
  else if (!req.body.idFavoritos && req.body.idInscritos.length > 0) {
    pgClient
      .query(`update usuario set idFavoritos='${req.body.idInscritos}' where id='${req.params.id}'`)
      .then(result => res.send(result))
      .catch(e => res.send(e));
  }
  else if(req.body.idInscritos.length > 0 && req.body.idFavoritos.length > 0){
    pgClient
      .query(`update usuario set idFavoritos='${req.body.idFavoritos}', idInscritos='${req.body.idInscritos}' where id='${req.params.id}'`)
      .then(result => res.send(result))
      .catch(e => res.send(e));
  }

});

// Delete Usuario by id
router.delete('/usuario/:id', (req, res, next) => {
  pgClient
    .query(`delete from usuario where id=${req.params.id}`)
    .then(result => res.send(result))
    .catch(e => res.send(e));
});

module.exports = router;
