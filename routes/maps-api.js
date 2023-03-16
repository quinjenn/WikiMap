/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  // Get the mapsSQL object from the request body

  // destructuring the properties
  const { map_title, map_description, image_url, user_id } = req.body;

  // insert into map table
  db.query(
    'INSERT INTO maps (title, description, image_url, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [map_title, map_description, image_url, user_id],
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Map ${result.id} inserted successfully`);
        res.send({ maps: result.rows[0] });
      }
    }
  );
});


//GET /my maps
router.get('/:id', (req, res) => {
  const maps = 'SELECT title, description, image_url, user_id FROM maps WHERE id = $1';
  const params = [req.params.id];
  console.log(maps);
  db.query(maps, params)
    .then(data => {
      const maps = data.rows[0];
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = router;
