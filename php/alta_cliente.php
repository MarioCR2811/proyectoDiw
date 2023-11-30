<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$nombre = $_POST["nombre"];
$email = $_POST["email"];
$telefono = $_POST["telefono"];
$direccion = $_POST["direccion"];

$sql = "INSERT INTO cliente (customer_name, customer_email, customer_telephone, customer_direction) VALUES ('$nombre', '$email', '$telefono', '$direccion')";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha insertado el cliente con éxito", $conexion);
}
?>
