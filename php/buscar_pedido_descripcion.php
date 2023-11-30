<?php
require_once('config.php');
$conexion = obtenerConexion();

// SQL
$descripcionPedido = $_POST["descripcionPedido"];

$sql = "SELECT * FROM pedido WHERE order_description LIKE '$descripcionPedido';";

$resultado = mysqli_query($conexion, $sql);

$datos = [];

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila;
}

if (!empty($datos)) {
    responder($datos, false, "Datos recuperados", $conexion);
} else {
    // No hay datos
    responder(null, true, "No existe el pedido", $conexion);
}
?>
