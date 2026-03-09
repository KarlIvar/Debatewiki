CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS topics (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_by_user_id INTEGER,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(created_by_user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY,
  topic_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  created_by_user_id INTEGER,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(topic_id) REFERENCES topics(id),
  FOREIGN KEY(created_by_user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS statements (
  id INTEGER PRIMARY KEY,
  topic_id INTEGER NOT NULL,
  question_id INTEGER,
  content TEXT NOT NULL,
  created_by_user_id INTEGER,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(topic_id) REFERENCES topics(id),
  FOREIGN KEY(question_id) REFERENCES questions(id),
  FOREIGN KEY(created_by_user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS arguments (
  id INTEGER PRIMARY KEY,
  statement_id INTEGER NOT NULL,
  parent_argument_id INTEGER,
  relation TEXT NOT NULL CHECK (relation IN ('support', 'counter')),
  content TEXT NOT NULL,
  source_url TEXT,
  created_by_user_id INTEGER,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(statement_id) REFERENCES statements(id),
  FOREIGN KEY(parent_argument_id) REFERENCES arguments(id),
  FOREIGN KEY(created_by_user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS votes (
  id INTEGER PRIMARY KEY,
  argument_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  value INTEGER NOT NULL CHECK (value IN (-1, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(argument_id, user_id),
  FOREIGN KEY(argument_id) REFERENCES arguments(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);
