 CREATE TABLE maps (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
