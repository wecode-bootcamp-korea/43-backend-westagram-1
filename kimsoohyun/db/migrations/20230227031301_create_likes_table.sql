-- migrate:up
CREATE TABLE likes
(
    id      INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    UNIQUE(user_id INT NOT NULL,
    post_id INT NOT NULL),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);


-- migrate:down
DROP TABLE likes;
