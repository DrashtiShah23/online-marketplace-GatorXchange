-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: csc648-team1-db
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL,
  `category` varchar(64) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Books'),(2,'Electronics'),(3,'Clothes');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(4096) NOT NULL,
  `created` datetime NOT NULL,
  `fk_sfsu_id` int NOT NULL,
  `fk_post_id` int NOT NULL,
  PRIMARY KEY (`message_id`),
  UNIQUE KEY `message_id_UNIQUE` (`message_id`),
  KEY `fk_sfsu_id_idx` (`fk_sfsu_id`),
  KEY `fk_post_id_idx` (`fk_post_id`),
  CONSTRAINT `fk_post_id` FOREIGN KEY (`fk_post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_sfsu_id` FOREIGN KEY (`fk_sfsu_id`) REFERENCES `users` (`sfsu_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `price` int NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photo_path` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `created` datetime NOT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `fk_sfsu_id` int NOT NULL,
  `fk_category_id` int NOT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id_UNIQUE` (`post_id`),
  KEY `posts to users_idx` (`fk_sfsu_id`),
  KEY `posts to categories_idx` (`fk_category_id`),
  CONSTRAINT `posts to categories` FOREIGN KEY (`fk_category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `posts to users` FOREIGN KEY (`fk_sfsu_id`) REFERENCES `users` (`sfsu_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Math textbook',30,'For calculus 101. Good condition','images/uploads/61d3810fff9a3435bd1f7e24cd32e552.jpeg','images/thumbnails/thumbnail-61d3810fff9a3435bd1f7e24cd32e552.jpeg','2020-12-18 20:16:01',1,900000000,1),(2,'Iphone charger',15,'Lightning to USB-A cable. Includes wall adapter','images/uploads/7784126fc893264d2002a3b7c70a0b5b.jpeg','images/thumbnails/thumbnail-7784126fc893264d2002a3b7c70a0b5b.jpeg','2020-12-18 20:16:01',1,900000001,2),(3,'Winter jacket',55,'Black jacket to keep you warm','images/uploads/541005802846b4cc24dbe9f98c1900e8.jpeg','images/thumbnails/thumbnail-541005802846b4cc24dbe9f98c1900e8.jpeg','2020-12-18 20:16:01',1,900000002,3),(4,'Economics textbook',30,'For economics and finance 101. Like new','images/uploads/32c33c0b5c90852f43923337763ebaa9.jpeg','images/thumbnails/thumbnail-32c33c0b5c90852f43923337763ebaa9.jpeg','2020-12-18 20:16:01',1,900000000,1),(5,'Classic black keyboard',35,'A USB keyboard to plug into your computer or laptop','images/uploads/5946bd9d0e145fbcf5f82f929714c5c7.jpeg','images/thumbnails/thumbnail-5946bd9d0e145fbcf5f82f929714c5c7.jpeg','2020-12-18 20:16:01',1,900000001,2),(6,'White t-shirt for sale',5,'Lightly used t-shirt. Very cheap.','images/uploads/0c9eb570ad2821506f0593caaaa716e1.jpeg','images/thumbnails/thumbnail-0c9eb570ad2821506f0593caaaa716e1.jpeg','2020-12-18 20:16:01',1,900000002,3);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `sfsu_id` int NOT NULL,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `registered` tinyint NOT NULL,
  PRIMARY KEY (`sfsu_id`),
  UNIQUE KEY `sfsu_id_UNIQUE` (`sfsu_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (900000000,'user1','abc1@mail.com','password1',1),(900000001,'user2','abc2@mail.com','password2',1),(900000002,'user3','abc3@mail.com','password3',1),(900000003,'user4','abc4@mail.com','password4',1),(900000004,'test','test@mail.sfsu.edu','password5',1),(900000005,'test1','test1@mail.sfsu.edu','password6',1),(900000006,'test2','test2@mail.sfsu.edu','password7',1),(900000007,'test3','test3@mail.sfsu.edu','password7',1),(900000008,'test4','test4@mail.sfsu.edu','password7',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-14  2:38:03