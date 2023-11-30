<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$pedido = json_decode($_POST['pedido']);

$sql = "UPDATE pedido
SET order_description = '" . $pedido->descripcion . "', 
order_date = '" . $pedido->fecha . "', 
order_total_amount = '$pedido->precio', 
customer_id = '" . $pedido->idcliente . "'
WHERE order_id = $pedido->id";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha modificado el pedido", $conexion);
}
?>