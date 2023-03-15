const express = require('express');
const router  = express.Router();
// write a require here for getting the data from the database
const db = require('../db/connection');
// import markersData array
const markersData = require('public/scripts/app.js');

// ** This code works assuming that I have already obtained the mapId value from the maps table somehow
// loop through each item in the markersData array
markersData.forEach(async (marker) => {
  try {
    // construct SQL query with placeholders for the parameterized values
    const query = `
    INSERT INTO points (latitude, longitude, name, map_id)
    VALUES ($1, $2, $3, $4)
    `;

    // execute the query with the parameterized values
    const result = await db.query(query, [marker.lat, marker.lng, marker.name, mapId]);

    console.log(`Inserted ${result.rowCount} row(s)`);
  } catch (err) {
    console.error(err);
  }
})


module.exports = router;
