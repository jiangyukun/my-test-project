/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80025
Source Host           : localhost:3306
Source Database       : kaki

Target Server Type    : MYSQL
Target Server Version : 80025
File Encoding         : 65001

Date: 2021-07-28 10:14:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for btc_price
-- ----------------------------
DROP TABLE IF EXISTS `btc_price`;
CREATE TABLE `btc_price` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` double NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49537 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for game_info
-- ----------------------------
DROP TABLE IF EXISTS `game_info`;
CREATE TABLE `game_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `period` int NOT NULL,
  `round` int NOT NULL,
  `price` int DEFAULT NULL,
  `blockNumber` int NOT NULL,
  `datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `game-info_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85225 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=7708 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for log_bridge
-- ----------------------------
DROP TABLE IF EXISTS `log_bridge`;
CREATE TABLE `log_bridge` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blockNumber` int NOT NULL,
  `txHash` varchar(200) COLLATE utf8_bin NOT NULL,
  `data` varchar(500) COLLATE utf8_bin NOT NULL,
  `topics` varchar(500) COLLATE utf8_bin NOT NULL,
  `timestamp` int NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3104 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for log_deposit
-- ----------------------------
DROP TABLE IF EXISTS `log_deposit`;
CREATE TABLE `log_deposit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blockNumber` int NOT NULL,
  `indexInBlock` int NOT NULL,
  `timestamp` int NOT NULL,
  `type` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `hash` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `data` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `topics` varchar(300) COLLATE utf8_bin NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=338 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for log_noloss
-- ----------------------------
DROP TABLE IF EXISTS `log_noloss`;
CREATE TABLE `log_noloss` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blockNumber` int NOT NULL,
  `indexInBlock` int NOT NULL,
  `fromAddress` varchar(120) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `timestamp` int NOT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `hash` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `data` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `topics` varchar(300) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42720 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for log_price
-- ----------------------------
DROP TABLE IF EXISTS `log_price`;
CREATE TABLE `log_price` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blockNumber` int NOT NULL,
  `indexInBlock` int NOT NULL,
  `timestamp` int NOT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `hash` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `data` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `topics` varchar(300) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92287 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` char(100) NOT NULL,
  `detail` varchar(100) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `member_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for member_bridge_data
-- ----------------------------
DROP TABLE IF EXISTS `member_bridge_data`;
CREATE TABLE `member_bridge_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `txHash` varchar(200) COLLATE utf8_bin NOT NULL,
  `amount` double NOT NULL,
  `address` varchar(255) COLLATE utf8_bin NOT NULL,
  `blockNumber` int NOT NULL,
  `timestamp` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=516 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for member_earnings
-- ----------------------------
DROP TABLE IF EXISTS `member_earnings`;
CREATE TABLE `member_earnings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `memberId` int NOT NULL,
  `period` int NOT NULL,
  `earnings` double(16,2) DEFAULT NULL,
  `teamId` int DEFAULT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17444 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for member_operation
-- ----------------------------
DROP TABLE IF EXISTS `member_operation`;
CREATE TABLE `member_operation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) COLLATE utf8_bin NOT NULL,
  `type` varchar(255) COLLATE utf8_bin NOT NULL,
  `value` double(15,2) DEFAULT NULL,
  `detail` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8698 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for team
-- ----------------------------
DROP TABLE IF EXISTS `team`;
CREATE TABLE `team` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teamName` varchar(50) NOT NULL,
  `datetime` datetime NOT NULL,
  `address` varchar(255) NOT NULL,
  `limits` double(15,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `team_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3891 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for team_earnings
-- ----------------------------
DROP TABLE IF EXISTS `team_earnings`;
CREATE TABLE `team_earnings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teamId` int NOT NULL,
  `period` int NOT NULL,
  `earnings` double(15,2) DEFAULT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47865 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for team_game_info
-- ----------------------------
DROP TABLE IF EXISTS `team_game_info`;
CREATE TABLE `team_game_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teamId` int NOT NULL,
  `gameId` int NOT NULL,
  `price` int NOT NULL,
  `type` int NOT NULL,
  `datetime` datetime DEFAULT NULL,
  `kc` double(16,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `team-game-info_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85031 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for team_member
-- ----------------------------
DROP TABLE IF EXISTS `team_member`;
CREATE TABLE `team_member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teamId` int NOT NULL,
  `memberId` int NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `team-member_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9955 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for team_member_statistics
-- ----------------------------
DROP TABLE IF EXISTS `team_member_statistics`;
CREATE TABLE `team_member_statistics` (
  `memberId` int NOT NULL,
  `teamId` int DEFAULT NULL,
  `total` double(18,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for team_rate
-- ----------------------------
DROP TABLE IF EXISTS `team_rate`;
CREATE TABLE `team_rate` (
  `teamId` int NOT NULL,
  `winCount` bigint NOT NULL DEFAULT '0',
  `allCount` bigint DEFAULT '0',
  `rate` decimal(24,4) DEFAULT NULL,
  `earnings` double(16,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for team_setting
-- ----------------------------
DROP TABLE IF EXISTS `team_setting`;
CREATE TABLE `team_setting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teamId` int NOT NULL,
  `showRank` smallint NOT NULL,
  `showMember` smallint NOT NULL,
  `showRate` smallint NOT NULL,
  `showBenefit` smallint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3706 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
