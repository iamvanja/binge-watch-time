CREATE TABLE show_list (
  list_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL DEFAULT ''
);

INSERT INTO show_list (list_id, name)
VALUES
  (1, 'To-do'),
  (2, 'Watching'),
  (3, 'Watched');

ALTER TABLE user_show
  ADD COLUMN list_id INTEGER NOT NULL;

UPDATE user_show SET list_id = 2;

CREATE INDEX user_show_parent_list ON user_show (list_id);

ALTER TABLE user_show
  ADD CONSTRAINT user_show_parent_list
  FOREIGN KEY (list_id)
  REFERENCES show_list (list_id)
  ON DELETE CASCADE;
