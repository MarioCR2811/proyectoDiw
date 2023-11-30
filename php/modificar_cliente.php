<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$cliente = json_decode($_POST['cliente']);

$sql = "UPDATE cliente
SET customer_name = '" . $cliente->nombre . "', 
customer_email = '" . $cliente->email . "', 
customer_telephone = '$cliente->telefono', 
customer_direction = '" . $cliente->direccion . "'
WHERE customer_id = $cliente->id";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha modificado el cliente", $conexion);
}
?>
