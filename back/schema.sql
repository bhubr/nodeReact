create database santa_gifts character set utf8mb4 collate utf8mb4_unicode_ci;
create user 'santa'@'localhost' identified by 'JingleBells@@1225';
grant all privileges on santa_gifts.* to 'santa'@'localhost';

CREATE TABLE IF NOT EXISTS gifts(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name varchar(80)
);

ALTER TABLE gifts ADD UNIQUE(name(80));
