CREATE TABLE `contact`
(
    `id`      INT          NOT NULL AUTO_INCREMENT,
    `name`    VARCHAR(150) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
    `email`   VARCHAR(150) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
    `contact` VARCHAR(15)  NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
    PRIMARY KEY (`id`) USING BTREE
) COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;
