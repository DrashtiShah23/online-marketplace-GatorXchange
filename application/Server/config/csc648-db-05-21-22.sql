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
  `fk_user_id` int NOT NULL,
  `fk_post_id` int NOT NULL,
  PRIMARY KEY (`message_id`),
  UNIQUE KEY `message_id_UNIQUE` (`message_id`),
  KEY `fk_post_id_idx` (`fk_post_id`),
  KEY `fk_user_id_idx` (`fk_user_id`),
  CONSTRAINT `messages_fk_post_id` FOREIGN KEY (`fk_post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_fk_user_id` FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `pickup_location` varchar(64) NOT NULL,
  `photo_path` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `created` datetime NOT NULL,
  `active` tinyint NOT NULL DEFAULT '0',
  `fk_user_id` int NOT NULL,
  `fk_category_id` int NOT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id_UNIQUE` (`post_id`),
  KEY `posts to users_idx` (`fk_user_id`),
  KEY `posts to categories_idx` (`fk_category_id`),
  CONSTRAINT `posts_fk_category_id` FOREIGN KEY (`fk_category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `posts_fk_user_id` FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Math textbook',30,'For calculus 101. Good condition.','Cesar Chavez Building','images/uploads/61d3810fff9a3435bd1f7e24cd32e552.jpeg','images/thumbnails/thumbnail-61d3810fff9a3435bd1f7e24cd32e552.jpeg','2022-05-01 23:54:06',1,2,1),(2,'Iphone charger',15,'Lightning to USB-A cable. Includes wall adapter.','J. Paul Leonard Library','images/uploads/7784126fc893264d2002a3b7c70a0b5b.jpeg','images/thumbnails/thumbnail-7784126fc893264d2002a3b7c70a0b5b.jpeg','2022-05-01 23:56:36',1,3,2),(3,'Winter jacket',55,'Black jacket to keep you warm.','Administration Building','images/uploads/541005802846b4cc24dbe9f98c1900e8.jpeg','images/thumbnails/thumbnail-541005802846b4cc24dbe9f98c1900e8.jpeg','2022-05-01 23:59:15',1,4,3),(4,'Economics textbook',30,'For economics and finance 101. Like new.','Cafe Russo','images/uploads/32c33c0b5c90852f43923337763ebaa9.jpeg','images/thumbnails/thumbnail-32c33c0b5c90852f43923337763ebaa9.jpeg','2022-05-02 00:00:47',1,5,1),(5,'Classic black keyboard',35,'A USB keyboard to plug into your computer or laptop.','Quad','images/uploads/5946bd9d0e145fbcf5f82f929714c5c7.jpeg','images/thumbnails/thumbnail-5946bd9d0e145fbcf5f82f929714c5c7.jpeg','2022-05-02 00:01:54',1,6,2),(6,'White t-shirt for sale',5,'Lightly used t-shirt. Very cheap.','Cesar Chavez Building','images/uploads/0c9eb570ad2821506f0593caaaa716e1.jpeg','images/thumbnails/thumbnail-0c9eb570ad2821506f0593caaaa716e1.jpeg','2022-05-02 00:03:23',1,7,3),(7,'Acer monitor',130,'High refresh rate. USB compatible.','J. Paul Leonard Library','images/uploads/c3e844e8e00a3c984304fda1443b4f18.jpeg','images/thumbnails/thumbnail-c3e844e8e00a3c984304fda1443b4f18.jpeg','2022-05-20 02:22:18',0,3,2),(12,'Clean Code Programming Book',20,'A handbook of agile software craftsmanship.','J. Paul Leonard Library','images/uploads/e37a9e84c572bf40242b32796969a1f3.jpeg','images/thumbnails/thumbnail-e37a9e84c572bf40242b32796969a1f3.jpeg','2022-05-21 09:45:33',0,1,1),(13,'Ti-84 Calculator. Good condition!',45,'Great for school.','Cafe Russo','images/uploads/ed6b0fd4e00b29fc477e4843126f20df.jpeg','images/thumbnails/thumbnail-ed6b0fd4e00b29fc477e4843126f20df.jpeg','2022-05-21 09:52:49',0,1,2),(14,'Selling mouse with RGB',18,'RGB! Pretty lights!','Cesar Chavez Building','images/uploads/d0d3cf2cf7cfd9299c07f0dae6ca3094.png','images/thumbnails/thumbnail-d0d3cf2cf7cfd9299c07f0dae6ca3094.png','2022-05-21 09:55:35',0,13,2),(15,'Mens jeans',15,'Worn lightly. Barely used. Need to get rid of it.','Administration Building','images/uploads/ec117b728186034f7303431483c0f5e3.jpeg','images/thumbnails/thumbnail-ec117b728186034f7303431483c0f5e3.jpeg','2022-05-21 10:27:38',0,16,3),(16,'California history book',5,'A history book that is actually readable.','J. Paul Leonard Library','images/uploads/86ef4445479bf448c1e82fe884c596ea.png','images/thumbnails/thumbnail-86ef4445479bf448c1e82fe884c596ea.png','2022-05-21 10:40:48',0,16,1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('J3VtS-QRiCwwnI2UOqEw7ZQ03yBVlwC7',1653241769,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":1,\"username\":\"admin\"}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `sfsu_id` int NOT NULL,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `registered` tinyint NOT NULL DEFAULT '1',
  `is_admin` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `sfsu_id_UNIQUE` (`sfsu_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,900000000,'admin','admin@mail.sfsu.edu','$2b$10$CcLwXdARaOarpwiJbwsHVe68ZgptnD/5U.ZIfB8rWUginV/VqV9UC',1,1),(2,900000001,'user1','user1@mail.sfsu.edu','$2b$10$smxeJGHmKkNkPjehqYX0weSUJprGV4/TXTOLSa373x9mbvZbD3/le',1,0),(3,900000002,'user2','user2@mail.sfsu.edu','$2b$10$DCr7LIrX5TnqnCtxM5G6tOeQempi22L.uKqNAUD0jVF9GHPTZLAye',1,0),(4,900000003,'user3','user3@mail.sfsu.edu','$2b$10$czQF./36ll5mibrXbusb.uwHKcp4B/cjr2Xz7chM4Ugy18bWZ/DDm',1,0),(5,900000004,'user4','user4@mail.sfsu.edu','$2b$10$uFwE3/f4VXGCsPDD3up5LeTJZ2VsnkY8ICfIQwzVcL9SKhNn8dRMO',1,0),(6,900000005,'user5','user5@mail.sfsu.edu','$2b$10$VR6krdTKzagXMK65ZCPJ2ONP2N4OH/rg/bV5ZNIZaXkOKaSMvCzj6',1,0),(7,900000006,'user6','user6@mail.sfsu.edu','$2b$10$5y41MpNZP0n0rQHE3.bp1OYAGO0xOAeK6hbcyi6qBHW.EP9pqYjwi',1,0),(8,900000007,'user7','user7@mail.sfsu.edu','$2b$10$V26wg54i7bPK8gJ.GsihjurrGMsbxePTZwA9MVw1Bgy65gD2UZjvC',1,0),(9,900000008,'user8','user8@mail.sfsu.edu','$2b$10$AgUQNsE0bhLoX/wP1.DrPeGsGQj8N3JgpeP86KlHWOOgHL1w17ZeC',1,0),(10,900000009,'user9','user9@mail.sfsu.edu','$2b$10$Qxm.FYhWwon4EHMPZ1LqKeh3QB2.8jWt6eYDzYV14MV2TSOgo9SDi',1,0),(13,900000010,'user10','user10@sfsu.edu','$2b$10$IbRj7S20KVlkYc92LEuTG.ZmVWq9DpjAnsrGO7kYA9ARbImkDvl2m',1,0),(15,900000011,'user11','user11@sfsu.edu','$2b$10$UMnhyOaSOW.VbHTDb.mE6u45e3l9yagMkEBgAD9tM/bH4n0WqYLxi',1,0),(16,900000012,'user12','user12@sfsu.edu','$2b$10$kNM5MxMy8UnbUjPvPYPsSe2XNOdtCD.MIVi3VjiKGE3gv/hc3n4wO',1,0);
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

-- Dump completed on 2022-05-21 10:50:37
