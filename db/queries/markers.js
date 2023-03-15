// const db = require('../connection');
// // const markers = require('public/scripts/app.js');

// // loop through markers array and insert data into the database
// for (const marker of markers) {
//   const lat = marker.getPosition().lat();
//   const lng = marker.getPosition().lng;
//   const placeName = marker.getTitle();
//   const query = {
//     text: 'INSERT INTO markers (lat, lng, place_name) VALUES ($1, $2, $3)',
//     values: [lat, lng, placeName],
//   };
//   client.query(query, (err, res) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('Data inserted successfully');
//   });
// }



// module.exports = markers;