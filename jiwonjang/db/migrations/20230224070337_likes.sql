-- migrate:up
CREATE TABLE likes(
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(post_id) REFERENCES posts(id),
  UNIQUE (user_id, post_id)
);

-- migrate:down
DROP TABLE likes;
