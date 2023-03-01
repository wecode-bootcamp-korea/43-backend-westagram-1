-- migrate:up
CREATE TABLE posts
(
    id         INT           NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image_url  VARCHAR(1000) NOT NULL,
    title      VARCHAR(100)  NOT NULL,
    content    VARCHAR(3000) NOT NULL,
    user_id    INT           NOT NULL,
    created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP     NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- migrate:down
DROP TABLE posts;
