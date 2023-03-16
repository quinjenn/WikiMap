// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

const db = require('./db/connection');
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const usersRoutes = require('./routes/users');
// routes for Google Maps Markers object
const markerRoutes = require('./routes/markers-routes');
const mapsRoutes = require('./routes/maps-api');
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
// // Note: mount other resources here, using the same pattern above
app.use('/api/users', userApiRoutes);
app.use('/users', usersRoutes);
// any request with url /api/markers will be handled by markerRoutes router
app.use('/api/markers', markerRoutes);
app.use('/api/maps', mapsRoutes);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.post("/my-maps", (req, res) => {
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


app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
