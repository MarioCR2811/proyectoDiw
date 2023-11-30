-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 26-11-2023 a las 11:37:55
-- Versión del servidor: 8.1.0
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `animacion_infantil`
--
CREATE DATABASE IF NOT EXISTS `animacion_infantil` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci;
USE `animacion_infantil`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `customer_id` int NOT NULL,
  `customer_name` varchar(50) COLLATE utf8mb3_spanish_ci NOT NULL,
  `customer_email` varchar(50) COLLATE utf8mb3_spanish_ci NOT NULL,
  `customer_telephone` int NOT NULL,
  `customer_direction` varchar(50) COLLATE utf8mb3_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`customer_id`, `customer_name`, `customer_email`, `customer_telephone`, `customer_direction`) VALUES
(1, 'Mario Cañas', 'mariocr2811@gmail.es', 123123123, 'Avenida El Invento 5 Sevilla'),
(4, 'Rosa Vargas', 'rosekramer@gmail.com', 999888666, 'Avenida La Constitucion 13, El Viso del Alcor'),
(8, 'Luis Vidal', 'luisvi@gmail.com', 123123111, 'Calle Mesina 6 Montequinto'),
(9, 'Antonio Ruíz', 'arpdrp@gmail.com', 112233322, 'Plaza de Parma 4 , Dos Hermanas'),
(10, 'Miguel Chias', 'mchias@gmail.com', 123456123, 'Calle La Española 12, Dos Hermanas'),
(11, 'Jonathan Regaña', 'jregana@gmail.com', 666555123, 'Calle Mesina 13, Dos Hermanas'),
(12, 'Gonzalo Ramírez', 'lite25@gmail.com', 111999666, 'Calle Venecia 12, Dos Hermanas'),
(13, 'Javier Villaverde', 'javierlala12@gmail.com', 555666333, 'Calle Tao 11, Alcalá de Guadaíra'),
(14, 'Mario Moreno', 'magiyo@gmail.com', 111444999, 'Calle La Magia 41, Tomares'),
(15, 'Manuel Mengo', 'manumengo@gmail.com', 111222338, 'Calle Tomate 12, Los Palacios y Villafranca'),
(16, 'Javier González', 'javigon@gmail.com', 111772345, 'Calle Mesina 2 1ºA, Dos Hermanas'),
(17, 'Manuel García', 'molondri@gmail.com', 111555876, 'Plaza de Parma 4 3ºC, Dos Hermanas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `order_id` int NOT NULL,
  `order_date` date NOT NULL,
  `order_description` varchar(50) COLLATE utf8mb3_spanish_ci NOT NULL,
  `order_total_amount` float NOT NULL,
  `customer_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`order_id`, `order_date`, `order_description`, `order_total_amount`, `customer_id`) VALUES
(4, '2023-11-13', 'Colchoneta Superheroes', 300, 1),
(5, '2023-11-08', 'Colchoneta Superheroes', 450, 4),
(6, '2023-08-02', 'Payasos', 250, 8),
(7, '2023-05-30', 'Payasos día completo', 450, 9),
(8, '2023-01-03', 'Colchoneta con tobogán', 600, 10),
(9, '2022-01-26', 'Colchoneta Superheroes', 450, 11),
(10, '2021-09-30', 'Maquillaje', 240, 12),
(11, '2022-11-09', 'Maquillaje día completo', 350, 13),
(12, '2023-11-26', 'Payasos', 300, 14),
(13, '2022-01-07', 'Colchoneta Simpsons', 800, 15),
(14, '2023-10-31', 'Colchoneta Superheroes', 750, 16),
(15, '2023-01-06', 'Payasos', 400, 17),
(16, '2023-11-06', 'Colchoneta Simpsons', 450, 1),
(17, '2023-11-06', 'Maquillaje día completo', 350, 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `fk_cliente_id` (`customer_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `customer_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `order_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `fk_cliente_id` FOREIGN KEY (`customer_id`) REFERENCES `cliente` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
