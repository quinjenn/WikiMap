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

router.post('/', (req, res) => {
  // Get the mapsSQL object from the request body
  const mapsSQL = req.body.mapsSQL;
  // const title = req.body.title;
  // const description = req.body.description;
  // const image = req.body.image_url;
  // const userId = req.body.user_id;
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
 

// let mapsSQL = {
//   map_id: {
//     title: "",
//     description: "",
//     image_url: "",
//     user_id: 8,
//   }
// };

// //GET /my maps
// router.get('/my.maps', (req, res) => {
//   const maps = query(`SELECT title, description, image_url FROM maps`);
//   console.log(maps);
//   db.query(maps)
//     .then(data => {
//       const maps = data.rows;
//       res.json({ maps });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });


// // POST /my maps *ADD TO DATABASE
// router.post("/", (req, res) => {
//   console.log(req.body);

//   const name = req.body.name;
//   const description = req.body.description;
//   const image = req.body.image;
// //QUERY TO INSERT TO DATABASE -
//   const newMyMap = {
//     Name: name,
//     Description: description,
//     Image: image,
//   };

//   // update maps
//   maps[name] = newMyMap;
//   //NEED TO RENDER TO HOMEPAGE, GIVING IT THE OBJECTS

//   res.send("my maps was created!");
// });

module.exports = router;
