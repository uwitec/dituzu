-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.1.41


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema happy_rent
--

CREATE DATABASE IF NOT EXISTS happy_rent;
USE happy_rent;

--
-- Definition of table `brief_info`
--

DROP TABLE IF EXISTS `brief_info`;
CREATE TABLE `brief_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `lng` double(9,6) NOT NULL,
  `lat` double(9,6) NOT NULL,
  `imgSrc` varchar(45) CHARACTER SET latin1 NOT NULL,
  `area` smallint(5) unsigned NOT NULL,
  `price` mediumint(8) unsigned NOT NULL,
  `rooms` tinyint(3) unsigned NOT NULL,
  `halls` tinyint(3) unsigned NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `level` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Index_2` (`lng`,`lat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `brief_info`
--

/*!40000 ALTER TABLE `brief_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `brief_info` ENABLE KEYS */;


--
-- Definition of table `detail_info`
--

DROP TABLE IF EXISTS `detail_info`;
CREATE TABLE `detail_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `toilets` tinyint(3) unsigned NOT NULL,
  `province` char(20) CHARACTER SET latin1 NOT NULL,
  `city` char(20) CHARACTER SET latin1 NOT NULL,
  `district` char(20) CHARACTER SET latin1 NOT NULL,
  `rent_type` tinyint(1) NOT NULL,
  `cell_name` varchar(40) CHARACTER SET latin1 NOT NULL,
  `with` tinyint(3) unsigned NOT NULL,
  `floor` tinyint(3) unsigned NOT NULL,
  `payment` tinyint(3) unsigned NOT NULL,
  `owner_name` char(20) CHARACTER SET latin1 NOT NULL,
  `owner_phone` char(11) CHARACTER SET latin1 NOT NULL,
  `owner_email` varchar(45) CHARACTER SET latin1 NOT NULL,
  `delete_code` char(32) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_detail_info_1` FOREIGN KEY (`id`) REFERENCES `brief_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `detail_info`
--

/*!40000 ALTER TABLE `detail_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `detail_info` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
