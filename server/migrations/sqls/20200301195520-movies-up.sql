CREATE TABLE movie_list (
  list_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL DEFAULT ''
);

INSERT INTO movie_list (list_id, name)
VALUES
  (1, 'To-do'),
  (2, 'Watched'),
  (3, 'Most Favorite');

CREATE TABLE user_movie (
  user_id INTEGER NOT NULL,
  movie_id INTEGER NOT NULL,
  datetime_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  list_id INTEGER NOT NULL,
  PRIMARY KEY (user_id, movie_id),
  CONSTRAINT user_movie_parent_list
    FOREIGN KEY (list_id)
    REFERENCES movie_list (list_id)
    ON DELETE CASCADE,
  CONSTRAINT user_movie_parent_user
    FOREIGN KEY (user_id)
    REFERENCES "user" (user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
