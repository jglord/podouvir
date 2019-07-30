const express = require('express');
const router = express.Router();
const pg = require('pg');

// Abrindo conexão com o postgreSQL
const connectionString = 'postgres://postgres:1598951@localhost:5432/ProjetoFinal';

const pgClient = new pg.Client(connectionString);

pgClient.connect();


//----------------------------------//
// CRUD Podcast

// Create Podcast

router.post('/podcast', (req, res) => {
    pgClient
      .query(`insert into podcast( nome, site, idepisodios)
              values ('${req.body.nome}', '${req.body.site}', '${req.body.idepisodios}')`)
      .then(result => res.send(result))
      .catch(e => res.send(e));
});

// Read Podcast
router.get(`/podcasts`, (req, res, next) => {
  pgClient.query('SELECT * from podcast')
  .then( result => res.send(result.rows))
  .catch(e => res.send(e));
});

// Read usuario baseado no id
router.get(`/podcast/:id`, (req, res, next) => {
    pgClient
      .query(`SELECT * from podcast where id=${req.params.id}`)
      .then( result => res.send(result.rows.length > 0 ? result.rows : false))
      .catch(e => res.send(e));
});


// Update Podcast

router.post('/podcast/:id', (req, res, next) => {
    if(req.body.idepisodios) {
      pgClient
        .query(`update podcast set idEpisodios='${req.body.idepisodios}' where id='${req.params.id}' `)
        .then(result => res.send(result))
        .catch(e => res.send(e));
    }
});


// Delete Podcast

// Delete Usuario by id
router.delete('/podcast/:id', (req, res, next) => {
    pgClient
      .query(`delete from podcast where id=${req.params.id}`)
      .then(result => res.send(result))
      .catch(e => res.send(e));
  });
  

module.exports = router;
