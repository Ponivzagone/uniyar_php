-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Хост: mysql:3306
-- Время создания: Дек 24 2019 г., 22:29
-- Версия сервера: 5.7.28
-- Версия PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `AOM`
--
CREATE DATABASE IF NOT EXISTS `AOM` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `AOM`;

-- --------------------------------------------------------

--
-- Структура таблицы `PASSENGERS`
--
-- Создание: Дек 24 2019 г., 22:26
-- Последнее обновление: Дек 24 2019 г., 22:27
--

DROP TABLE IF EXISTS `PASSENGERS`;
CREATE TABLE `PASSENGERS` (
  `TRAIN_NUM` int(11) NOT NULL,
  `FIRST` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `LAST` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `GENDER` bit(1) NOT NULL,
  `PASS_SERIES` int(11) NOT NULL,
  `PASS_NUM` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `ROUTELIST`
--
-- Создание: Дек 24 2019 г., 22:28
--

DROP TABLE IF EXISTS `ROUTELIST`;
CREATE TABLE `ROUTELIST` (
  `NAME` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `TRAINLIST`
--
-- Создание: Дек 24 2019 г., 22:26
-- Последнее обновление: Дек 24 2019 г., 22:27
--

DROP TABLE IF EXISTS `TRAINLIST`;
CREATE TABLE `TRAINLIST` (
  `NUM` int(11) NOT NULL,
  `TYPE` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `CAR_NUMBER` int(11) NOT NULL,
  `CAR_TYPE` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `BEGIN` date NOT NULL,
  `END` date NOT NULL,
  `ID_ROUTE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `PASSENGERS`
--
ALTER TABLE `PASSENGERS`
  ADD KEY `TRAIN_NUM` (`TRAIN_NUM`);

--
-- Индексы таблицы `ROUTELIST`
--
ALTER TABLE `ROUTELIST`
  ADD KEY `ID` (`ID`);

--
-- Индексы таблицы `TRAINLIST`
--
ALTER TABLE `TRAINLIST`
  ADD KEY `NUM` (`NUM`),
  ADD KEY `ID_ROUTE` (`ID_ROUTE`);

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `PASSENGERS`
--
ALTER TABLE `PASSENGERS`
  ADD CONSTRAINT `PASSENGERS_ibfk_1` FOREIGN KEY (`TRAIN_NUM`) REFERENCES `TRAINLIST` (`NUM`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `TRAINLIST`
--
ALTER TABLE `TRAINLIST`
  ADD CONSTRAINT `TRAINLIST_ibfk_1` FOREIGN KEY (`ID_ROUTE`) REFERENCES `ROUTELIST` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
