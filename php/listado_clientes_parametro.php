<?php
require_once('config.php');
$conexion = obtenerConexion();

// SQL
$direccionCliente = $_POST["direccionCliente"];

$sql = "SELECT * FROM cliente WHERE customer_direction LIKE '%$direccionCliente%';";

$resultado = mysqli_query($conexion, $sql);

$datos = [];

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila;
}

if (!empty($datos)) {
    responder($datos, false, "Datos recuperados", $conexion);
} else {
    // No hay datos
    responder(null, true, "No existe el cliente", $conexion);
}
?>
