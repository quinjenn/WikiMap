const express = require('express');
const router = express.Router();
// write a require here for getting the data from the database
const db = require('../db/connection');

//would this code work to send the code to the database?
router.post('/', (req, res) => {
  const markersData = req.body.markersData;
  const mapId = req.body.mapId;
  console.log("req.body:", req.body);

  markersData.forEach(marker => {
    const { lat, lng, name } = marker;

    db.query(
      'INSERT INTO points (latitude, longitude, name, map_id) VALUES ($1, $2, $3, $4)',
      [lat, lng, name, mapId],
      (err, result) => {
        if (err) {
          console.error(err);
        }
      }
    );
  });

  res.send('Marker data inserted successfully');
});

module.exports = router;
