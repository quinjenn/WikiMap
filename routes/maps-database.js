const express = require('express');
const router = express.Router();
const db = require('../db/connection');


const mapsRoutes = require('./routes/maps-api');

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
router.post("/my-maps", (req, res) => {
  const { map_title, map_description, image_url, user_id } = req.body;
  console.log("req.body", req.body);
  db.query(
    'INSERT INTO maps (title, description, image_url, user_id) VALUES ($1, $2, $3, $4)',
    [map_title, map_description, image_url, user_id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error inserting data into maps table');
      } else {
        console.log("data inserted");
        res.status(200).send('Data inserted successfully');
      }
    }
  );
  // res.send({ result: "Data Received" });
});

module.exports = router;
