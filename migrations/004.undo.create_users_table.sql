ALTER TABLE notes
  DROP COLUMN IF EXISTS created_by;

DROP TABLE IF EXISTS users;