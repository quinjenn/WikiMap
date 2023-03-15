CREATE TABLE points (
  id SERIAL PRIMARY KEY,
  latitude DECIMAL(9,6) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL,
  name VARCHAR(255) NOT NULL,
  map_id INTEGER REFERENCES maps(map_id)
);
