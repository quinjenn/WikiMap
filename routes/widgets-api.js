/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

//GET /my maps
router.get('/my.maps', (req, res) => {
  const maps = query(`SELECT title, description, image_url FROM maps`);
  console.log(maps);
  db.query(maps)
    .then(data => {
      const maps = data.rows;
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


// POST /my maps
router.post("/my-maps", (req, res) => {
  console.log(req.body);

  const name = req.body.name;
  const description = req.body.description;
  const image = req.body.image;

  const newMyMap = {
    Name: name,
    Description: description,
    Image: image,
  };

  // update maps
  maps[name] = newMyMap;

  res.send("my maps was created!");
});

module.exports = router;
