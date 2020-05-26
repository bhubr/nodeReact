create database santa_gifts character set utf8mb4 collate utf8mb4_unicode_ci;
create user 'santa'@'localhost' identified by 'JingleBells@@1225';
grant all privileges on santa_gifts.* to 'santa'@'localhost';
