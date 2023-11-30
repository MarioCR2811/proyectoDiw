<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idcliente = $_POST['idcliente'];

// SQL
$sql = "SELECT * FROM cliente WHERE customer_id = $idcliente";

$resultado = mysqli_query($conexion, $sql);

// Pedir una fila
$fila = mysqli_fetch_assoc($resultado);

if($fila){ // Devuelve datos
    // responder(datos, error, mensaje, conexion)
    responder($fila, false, "Datos recuperados", $conexion);
} else { // No hay datos
    responder(null, true, "No existe el cliente", $conexion);
}

