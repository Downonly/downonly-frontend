# ************************************************************
# Sequel Ace SQL dump
# Version 20048
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: 81.169.140.47 (MySQL 5.5.5-10.5.19-MariaDB-0+deb11u2)
# Database: downonly
# Generation Time: 2023-07-23 11:07:23 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table mints
# ------------------------------------------------------------

DROP TABLE IF EXISTS `mints`;

CREATE TABLE `mints` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jobState` varchar(255) DEFAULT NULL,
  `surface` varchar(255) DEFAULT NULL,
  `obstacle` varchar(255) DEFAULT NULL,
  `figure` varchar(255) DEFAULT NULL,
  `ipfs` varchar(255) DEFAULT NULL,
  `openSea` varchar(255) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `mints` WRITE;
/*!40000 ALTER TABLE `mints` DISABLE KEYS */;

INSERT INTO `mints` (`id`, `jobState`, `surface`, `obstacle`, `figure`, `ipfs`, `openSea`)
VALUES
	(1,'minted','asd1','asd2','asd3','https://gateway.pinata.cloud/ipfs/QmVHsPUUoxmWvP4yogUf9GnnKXoPMjBVRsipyzLUYEvEPc','www.example.com'),
	(2,'minted','tomorrow','lemmesleep','bad','https://gateway.pinata.cloud/ipfs/QmVHsPUUoxmWvP4yogUf9GnnKXoPMjBVRsipyzLUYEvEPc','example.com'),
	(3,'minted','tomorrow','lemmesleep','bad','https://gateway.pinata.cloud/ipfs/QmVHsPUUoxmWvP4yogUf9GnnKXoPMjBVRsipyzLUYEvEPc','example.com'),
	(4,'minted','asd1','asd2','asd3','https://gateway.pinata.cloud/ipfs/QmVHsPUUoxmWvP4yogUf9GnnKXoPMjBVRsipyzLUYEvEPc','www.example.com');

/*!40000 ALTER TABLE `mints` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
