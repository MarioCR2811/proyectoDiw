<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$descripcion = $_POST["descripcion"];
$fecha = $_POST["fecha"];
$precio = $_POST["precio"];
$idcliente = $_POST["idcliente"];

$sql = "INSERT INTO pedido (order_description, order_date, order_total_amount, customer_id) VALUES ('$descripcion', '$fecha', '$precio', '$idcliente')";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha insertado el pedido con éxito", $conexion);
}
?>
