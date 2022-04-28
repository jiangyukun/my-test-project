/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80025
Source Host           : localhost:3306
Source Database       : kaki

Target Server Type    : MYSQL
Target Server Version : 80025
File Encoding         : 65001

Date: 2021-07-26 18:12:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for game_interest
-- ----------------------------
DROP TABLE IF EXISTS `game_interest`;
CREATE TABLE `game_interest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `period` int NOT NULL,
  `interest` double NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3778 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
