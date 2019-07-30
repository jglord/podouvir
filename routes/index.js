const express = require('express');
const router = express.Router();
const pg = require('pg');

// Abrindo conexão com o postgreSQL
const connectionString = 'postgres://postgres:1598951@localhost:5432/ProjetoFinal';

const pgClient = new pg.Client(connectionString);

pgClient.connect();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

// Login
router.post('/login', (req, res, next) => {
  pgClient.query(`select username, passhash from usuario where username='${req.body.username}' and passhash='${req.body.password}'`)
  .then(result => res.send(result.rows.length > 0 ? true : 'Usuário ou senha inválido'))
  .catch(e => res.send(e));
});

module.exports = router;