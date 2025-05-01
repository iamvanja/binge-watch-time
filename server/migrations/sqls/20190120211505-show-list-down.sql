ALTER TABLE user_show
  DROP CONSTRAINT IF EXISTS user_show_parent_list;

DROP INDEX IF EXISTS user_show_parent_list;

ALTER TABLE user_show
  DROP COLUMN IF EXISTS list_id;

DROP TABLE IF EXISTS show_list;
