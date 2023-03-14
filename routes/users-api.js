/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
// const { Pool } = require('pg');
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false }
// });

router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// // will add longitude and latitude of every place searched to sql database
// router.post('/points', async (req, res) => {
//   const { name, latitude, longitude } = req.body;
//   const client = await pool.connect();
//   try {
//     await client.query('BEGIN');
//     await client.query('INSERT INTO places (name, latitude, longitude) VALUES ($1, $2, $3)', [name, latitude, longitude]);
//     await client.query('COMMIT');
//     res.sendStatus(200);
//   } catch (error) {
//     await client.query('ROLLBACK');
//     console.error(error);
//     res.sendStatus(500);
//   } finally {
//     client.release();
//   }
// });

module.exports = router;
