<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idPedido = $_POST['idPedido'];

// SQL
$sql = "DELETE FROM pedido WHERE order_id = $idPedido;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);
?>