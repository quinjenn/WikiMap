const express = require('express');
const router  = express.Router();
// write a require here for getting the data from the database
const db = require('../db/connection');

// GET all markers

router.get('/markers', async (req, res) => {
  try {
    const allMarkers = await pool.query('SELECT * FROM points');
    res.json(allMarkers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
