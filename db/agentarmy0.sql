-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 21, 2022 at 09:48 PM
-- Server version: 5.7.37-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `agentarmy`
--

-- --------------------------------------------------------

--
-- Table structure for table `field`
--

CREATE TABLE `field` (
  `id_field` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `form`
--

CREATE TABLE `form` (
  `id_form` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `form_field`
--

CREATE TABLE `form_field` (
  `id_fm` int(11) NOT NULL,
  `id_fd` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id_role` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id_role`, `name`) VALUES
(0, 'admin'),
(1, 'agent');

-- --------------------------------------------------------

--
-- Table structure for table `sub_role`
--

CREATE TABLE `sub_role` (
  `id_subrole` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthday` date DEFAULT NULL,
  `id_role` int(11) NOT NULL,
  `id_subrole` int(11) DEFAULT NULL,
  `id_form` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `firstname`, `lastname`, `username`, `password`, `birthday`, `id_role`, `id_subrole`, `id_form`) VALUES
(1, 'amine', 'bk', 'root', '$2a$04$.4Evww7YYwBAKKOzms/MLepKSbEmzdK8TsfJvzEOTsWF/LRcYvnMO', NULL, 0, NULL, NULL),
(2, 'ts', 't', 'root1', '$2a$04$o1CtzvqvS/MHZ/ugC.hZC.H6ht1/.jI.Ogu7.ZrQfX1P11cY/82V6', NULL, 1, NULL, NULL),
(3, 'ts', 't', 'root1', '$2a$04$nMqNfxJYnA4qcrtghu/cZOIyA2BqsCPDZdIueX.vHA60bKPdMpOkS', NULL, 1, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `field`
--
ALTER TABLE `field`
  ADD PRIMARY KEY (`id_field`);

--
-- Indexes for table `form`
--
ALTER TABLE `form`
  ADD PRIMARY KEY (`id_form`);

--
-- Indexes for table `form_field`
--
ALTER TABLE `form_field`
  ADD PRIMARY KEY (`id_fm`,`id_fd`),
  ADD KEY `id_fd` (`id_fd`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`);

--
-- Indexes for table `sub_role`
--
ALTER TABLE `sub_role`
  ADD PRIMARY KEY (`id_subrole`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `usrid_role` (`id_role`),
  ADD KEY `usrid_subrole` (`id_subrole`),
  ADD KEY `usrid_form` (`id_form`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `field`
--
ALTER TABLE `field`
  MODIFY `id_field` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `form`
--
ALTER TABLE `form`
  MODIFY `id_form` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `sub_role`
--
ALTER TABLE `sub_role`
  MODIFY `id_subrole` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `form_field`
--
ALTER TABLE `form_field`
  ADD CONSTRAINT `form_field_ibfk_1` FOREIGN KEY (`id_fm`) REFERENCES `form` (`id_form`),
  ADD CONSTRAINT `form_field_ibfk_2` FOREIGN KEY (`id_fd`) REFERENCES `field` (`id_field`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `usrid_form` FOREIGN KEY (`id_form`) REFERENCES `form` (`id_form`),
  ADD CONSTRAINT `usrid_role` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`),
  ADD CONSTRAINT `usrid_subrole` FOREIGN KEY (`id_subrole`) REFERENCES `sub_role` (`id_subrole`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
