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
  const mapsSQL = req.body.mapsSQL;
  console.log("req.body:", req.body);

  // loop through the entries of the mapsSQL object
  for (const [mapId, mapData] of Object.entries(mapsSQL)) {
    // destructuring the properties
    const { title, description, image_url, user_id } = mapData;

    // insert into map table
    db.query(
      'INSERT INTO maps (title, description, image_url, user_id) VALUES ($1, $2, $3, $4)',
      [mapId, title, description, image_url, user_id],
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Map ${mapId} inserted successfully`);
        }
      }
    );
  }

  res.send('Maps data inserted successfully');
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
