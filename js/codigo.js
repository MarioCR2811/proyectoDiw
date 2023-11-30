"use strict";

// MAIN PROGRAM
var oEmpresa = new Empresa();

registrarEventos();

// Registro de eventos
function registrarEventos() {
  // Opciones de menú
  document
    .querySelector("#mnuAltaCliente")
    .addEventListener("click", mostrarFormulario);

  document
    .querySelector("#mnuBuscarCliente")
    .addEventListener("click", mostrarFormulario);

  document
    .querySelector("#mnuListarClientes")
    .addEventListener("click", mostrarListadoClientes);

  document
    .querySelector("#mnuBuscarClienteParametros")
    .addEventListener("click", mostrarFormulario);

  document
    .querySelector("#mnuAltaPedido")
    .addEventListener("click", mostrarFormulario);

  document
    .querySelector("#mnuBuscarPedido")
    .addEventListener("click", mostrarFormulario);

  document
    .querySelector("#mnuListarPedidos")
    .addEventListener("click", mostrarListadoPedidos);

  document
    .querySelector("#mnuBuscarPedidoDescripcion")
    .addEventListener("click", mostrarFormulario);

  // Botones
  frmAltaCliente.btnAceptarAltaCliente.addEventListener(
    "click",
    procesarAltaCliente
  );
  frmBuscarCliente.btnBuscarCliente.addEventListener(
    "click",
    procesarBuscarCliente
  );

  frmBuscarClienteParametros.btnBuscarClienteParametro.addEventListener(
    "click",
    procesarBuscarClienteParametros
  );

  frmEditarCliente.btnAceptarModificacionCliente.addEventListener(
    "click",
    procesarModificarCliente
  );

  frmAltaPedido.btnAceptarAltaPedido.addEventListener(
    "click",
    procesarAltaPedido
  );

  frmBuscarPedido.btnBuscarPedido.addEventListener(
    "click",
    procesarBuscarPedido
  );

  frmBuscarPedidoDescripcion.btnAceptarBuscarPedidoDescripcion.addEventListener(
    "click",
    procesarBuscarPedidoDescripcion
  );

  frmEditarPedido.btnAceptarModificacionPedido.addEventListener(
    "click",
    procesarModificarPedido
  );
}

function mostrarFormulario(oEvento) {
  let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)

  ocultarFormularios();

  switch (opcionMenu) {
    case "mnuAltaCliente":
      frmAltaCliente.style.display = "block";
      break;

    case "mnuBuscarCliente":
      frmBuscarCliente.style.display = "block";
      break;

    case "mnuBuscarClienteParametros":
      frmBuscarClienteParametros.style.display = "block";
      break;

    case "mnuAltaPedido":
      frmAltaPedido.style.display = "block";
      actualizarDesplegableTipos(undefined);
      break;

    case "mnuBuscarPedido":
      frmBuscarPedido.style.display = "block";
      break;
    
    case "mnuBuscarPedidoDescripcion":
      frmBuscarPedidoDescripcion.style.display = "block";
      actualizarDesplegableDescripcion(undefined);
      break;
  }
}

function ocultarFormularios() {
  let resultadoBusqueda = document.querySelector("#resultadoBusqueda");
  resultadoBusqueda.style.display = "none";
  frmBuscarClienteParametros.style.display = "none";
  frmAltaCliente.style.display = "none";
  frmBuscarCliente.style.display = "none";
  frmEditarCliente.style.display = "none";
  frmAltaPedido.style.display = "none";
  frmBuscarPedido.style.display = "none";
  frmEditarPedido.style.display = "none";
  frmBuscarPedidoDescripcion.style.display = "none";
  document.querySelector("#resultadoBusqueda").innerHTML = "";
  document.querySelector("#resultadoBusquedaParametros").innerHTML = "";
}

// Procesos de botones
async function procesarBuscarCliente() {
  if (validarBuscarCliente()) {
    let idCliente = parseInt(frmBuscarCliente.txtIDCliente.value.trim());

    let respuesta = await oEmpresa.buscarCliente(idCliente);

    if (!respuesta.error) {
      let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

      // Escribimos resultado
      let tablaSalida = "<table class='table'>";
      tablaSalida +=
        "<thead><tr><th>ID</th><th>NOMBRE</th><th>EMAIL</th><th>TELEFONO</th><th>DIRECCION</th></tr></thead>";
      tablaSalida += "<tbody><tr>";
      tablaSalida += "<td>" + respuesta.datos.customer_id + "</td>";
      tablaSalida += "<td>" + respuesta.datos.customer_name + "</td>";
      tablaSalida += "<td>" + respuesta.datos.customer_email + "</td>";
      tablaSalida += "<td>" + respuesta.datos.customer_telephone + "</td>";
      tablaSalida += "<td>" + respuesta.datos.customer_direction + "</td>";
      tablaSalida +=
        "<td><input type='button' value='Borrar' class='btnBorrarCliente' data-idcliente='" +
        respuesta.datos.customer_id +
        "'></td>";
      tablaSalida += "</tr></tbody></table>";

      resultadoBusqueda.innerHTML = tablaSalida;
      resultadoBusqueda.style.display = "block";
      frmBuscarCliente.txtIDCliente.value = "";

      let btnBorrarClientes = document.querySelectorAll(".btnBorrarCliente");
      btnBorrarClientes.forEach((btn) => {
        btn.addEventListener("click", function (oEvento) {
          borrarCliente(oEvento);
        });
      });
    } else {
      alert(respuesta.mensaje);
    }
  }
}

function validarBuscarCliente() {
  let idCliente = parseInt(frmBuscarCliente.txtIDCliente.value.trim());
  let valido = true;
  let errores = "";

  if (isNaN(idCliente)) {
    valido = false;
    errores += "El identificador del cliente debe ser numérico";
  }

  if (!valido) {
    // Hay errores
    alert(errores);
  }

  return valido;
}

async function borrarCliente(oEvento) {
  let boton = oEvento.target;
  let idCliente = boton.dataset.idcliente;

  let respuesta = await oEmpresa.borrarCliente(idCliente);

  alert(respuesta.mensaje);

  if (!respuesta.error) {
    document.querySelector("#resultadoBusqueda").innerHTML = "";
  }
}

async function procesarAltaCliente() {
  if (validarAltaCliente()) {
    let nombre = frmAltaCliente.txtNombre.value.trim();
    let email = frmAltaCliente.txtEmail.value.trim();
    let telefono = frmAltaCliente.txtTelefono.value.trim();
    let direccion = frmAltaCliente.txtDireccion.value.trim();

    let respuesta = await oEmpresa.altaCliente(
      new Cliente(null, nombre, email, telefono, direccion)
    );

    alert(respuesta.mensaje);

    if (!respuesta.error) {
      // Si NO hay error
      //Resetear formulario
      frmAltaCliente.reset();
      // Ocultar el formulario
      frmAltaCliente.style.display = "none";
    }
  }
}

function validarAltaCliente() {
  let nombre = frmAltaCliente.txtNombre.value.trim();
  let email = frmAltaCliente.txtEmail.value.trim();
  let telefono = frmAltaCliente.txtTelefono.value.trim();
  let direccion = frmAltaCliente.txtDireccion.value.trim();

  let valido = true;
  let errores = "";

  if (
    nombre.length == 0 ||
    email.length == 0 ||
    telefono.length == 0 ||
    direccion.length == 0
  ) {
    valido = false;
    errores += "Faltan datos por rellenar";
  }

  if (!valido) {
    // Hay errores
    alert(errores);
  }

  return valido;
}

async function procesarBuscarClienteParametros() {
  let direccionCliente = frmBuscarClienteParametros.txtDireccion.value.trim();

  if (direccionCliente == "") {
    alert("Introduce una direccion");
    return;
  }

  let respuesta = await oEmpresa.buscarClientePorDireccion(direccionCliente);

  if (!respuesta.error) {
    let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

    // Verificamos si hay datos en la respuesta
    if (respuesta.datos.length > 0) {
      // Escribimos resultado
      let tablaSalida =
        "<table class='table table-striped' id='listadoPorDireccion'>";
      tablaSalida +=
        "<thead><tr><th>ID</th><th>NOMBRE</th><th>EMAIL</th><th>TELEFONO</th><th>DIRECCION</th></tr></thead>";
      tablaSalida += "<tbody>";

      // Iteramos sobre cada resultado
      for (let cliente of respuesta.datos) {
        tablaSalida += "<tr>";
        tablaSalida += "<td>" + cliente.customer_id + "</td>";
        tablaSalida += "<td>" + cliente.customer_name + "</td>";
        tablaSalida += "<td>" + cliente.customer_email + "</td>";
        tablaSalida += "<td>" + cliente.customer_telephone + "</td>";
        tablaSalida += "<td>" + cliente.customer_direction + "</td>";
        tablaSalida +=
          "<td><button class='btn btn-primary' data-cliente='" +
          JSON.stringify(cliente) +
          "'><i class='bi bi-pencil-square'></i></button></td></tr>";
        tablaSalida += "</tr>";
      }

      tablaSalida += "</tbody></table>";

      resultadoBusqueda.innerHTML = tablaSalida;
      resultadoBusqueda.style.display = "block";
      frmBuscarClienteParametros.txtDireccion.value = "";
      document
        .querySelector("#listadoPorDireccion")
        .addEventListener("click", procesarBotonEditarCliente);
    } else {
      alert("No se encontraron clientes con esa dirección.");
    }
  } else {
    alert(respuesta.mensaje);
  }
}

function procesarBotonEditarCliente(oEvento) {
  let boton = null;

  // Verificamos si han hecho clic sobre el botón o el icono
  if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "button") {
    if (oEvento.target.nodeName == "I") {
      // Pulsacion sobre el icono
      boton = oEvento.target.parentElement; // El padre es el boton
    } else {
      boton = oEvento.target;
    }

    // 1.Ocultar todos los formularios
    ocultarFormularios();
    // 2.Mostrar el formulario de modificación de componentes
    frmEditarCliente.style.display = "block";
    // 3. Rellenar los datos de este formulario con los del componente
    let cliente = JSON.parse(boton.dataset.cliente);

    frmEditarCliente.txtModID.value = cliente.customer_id;
    frmEditarCliente.txtModNombre.value = cliente.customer_name;
    frmEditarCliente.txtModEmail.value = cliente.customer_email;
    frmEditarCliente.txtModTelefono.value = cliente.customer_telephone;
    frmEditarCliente.txtModDireccion.value = cliente.customer_direction;
  }
}

async function procesarModificarCliente() {
  let id = parseInt(frmEditarCliente.txtModID.value.trim());
  let nombre = frmEditarCliente.txtModNombre.value.trim();
  let email = frmEditarCliente.txtModEmail.value.trim();
  let telefono = frmEditarCliente.txtModTelefono.value.trim();
  let direccion = frmEditarCliente.txtModDireccion.value.trim();

  if (validarModCliente()) {
    let respuesta = await oEmpresa.modificarCliente(
      new Cliente(id, nombre, email, telefono, direccion)
    );

    alert(respuesta.mensaje);

    if (!respuesta.error) {
      // Si NO hay error
      //Resetear formulario
      frmEditarCliente.reset();
      // Ocultar el formulario
      frmEditarCliente.style.display = "none";
    }
  }
}

function validarModCliente() {
  // Recuperar datos del formulario frmEditarCliente
  let nombre = frmEditarCliente.txtModNombre.value.trim();
  let email = frmEditarCliente.txtModEmail.value.trim();
  let telefono = frmEditarCliente.txtModTelefono.value.trim();
  let direccion = frmEditarCliente.txtModDireccion.value.trim();

  let valido = true;
  let errores = "";

  if (
    nombre.length === 0 ||
    email.length === 0 ||
    telefono.length === 0 ||
    direccion.length === 0
  ) {
    valido = false;
    errores += "Ningún campo puede estar vacío";
  }

  if (!valido) {
    // Hay errores
    alert(errores);
  }

  return valido;
}

// Mostrar listado de tipos de componentes
function mostrarListadoClientes() {
  open("listado_clientes.html");
}

function mostrarListadoPedidos() {
  open("listado_pedidos.html");
}

// Método para validar el formulario de alta de pedido
function validarAltaPedido() {
  let descripcion = frmAltaPedido.txtDescripcion.value.trim();
  let fecha = new Date(frmAltaPedido.txtFecha.value.trim()); // Convertir a objeto Date
  let precio = parseFloat(frmAltaPedido.txtPrecio.value.trim());
  let tipo = frmAltaPedido.lstCliente.value;

  // Validar los campos según tus criterios
  let valido = true;
  let errores = "";

  // Validar cada campo y agregar mensajes de error si es necesario
  if (descripcion.length === 0) {
    valido = false;
    errores += "La descripción del pedido no puede estar vacía.\n";
  }

  // Validar si la fecha es válida
  if (isNaN(fecha.getTime())) {
    valido = false;
    errores += "La fecha ingresada no es válida.\n";
  }

  if (precio < 0) {
    valido = false;
    errores += "El precio no puede ser negativo.\n";
  }

  if (!valido) {
    alert(errores);
  }

  return valido;
}

async function procesarAltaPedido() {
  if (validarAltaPedido()) {
    let descripcion = frmAltaPedido.txtDescripcion.value.trim();
    let fecha = frmAltaPedido.txtFecha.value.trim();
    let precio = parseFloat(frmAltaPedido.txtPrecio.value.trim());
    let idcliente = frmAltaPedido.lstCliente.value;

    let respuesta = await oEmpresa.altaPedido(
      new Pedido(null, descripcion, fecha, precio, idcliente)
    );

    alert(respuesta.mensaje);

    if (!respuesta.error) {
      // Si NO hay error
      // Resetear formulario
      frmAltaPedido.reset();
    }
  }
}

async function actualizarDesplegableTipos(idTipoSeleccionado) {
  let respuesta = await oEmpresa.getClientes();
  let options = "";

  for (let cliente of respuesta.datos) {
    if (idTipoSeleccionado && idTipoSeleccionado == cliente.customer_id) {
      // Si llega el parámetro ( != undefined )
      options +=
        "<option selected value='" +
        cliente.customer_id +
        "' >" +
        cliente.customer_name +
        "</option>";
    } else {
      options +=
        "<option value='" +
        cliente.customer_id +
        "' >" +
        cliente.customer_name +
        "</option>";
    }
  }
  frmAltaPedido.lstCliente.innerHTML = options;
  frmEditarPedido.lstClienteMod.innerHTML = options;
}

async function actualizarDesplegableDescripcion(idTipoSeleccionado) {
  
  let respuesta = await oEmpresa.getPedidos();
  let options = "";

  for (let pedido of respuesta.datos) {
    if (idTipoSeleccionado && idTipoSeleccionado == pedido.order_id) {
      // Si llega el parámetro ( != undefined )
      options +=
        "<option selected value='" +
        pedido.order_description+
        "' >" +
        pedido.order_description +
        "</option>";
    } else {
      options +=
        "<option value='" +
        pedido.order_description +
        "' >" +
        pedido.order_description +
        "</option>";
    }
  }
  frmBuscarPedidoDescripcion.lstDescripcion.innerHTML = options;
}

async function procesarBuscarPedido() {
  if (validarBuscarPedido()) {
    let idPedido = parseInt(frmBuscarPedido.txtIDPedido.value.trim());

    let respuesta = await oEmpresa.buscarPedido(idPedido);

    if (!respuesta.error) {
      let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

      // Escribimos resultado
      let tablaSalida = "<table class='table'>";
      tablaSalida +=
        "<thead><tr><th>ID</th><th>DESCRIPCION</th><th>FECHA</th><th>PRECIO</th><th>IDCLIENTE</th></tr></thead>";
      tablaSalida += "<tbody><tr>";
      tablaSalida += "<td>" + respuesta.datos.order_id + "</td>";
      tablaSalida += "<td>" + respuesta.datos.order_description + "</td>";
      tablaSalida += "<td>" + respuesta.datos.order_date + "</td>";
      tablaSalida += "<td>" + respuesta.datos.order_total_amount + "</td>";
      tablaSalida += "<td>" + respuesta.datos.customer_id + "</td>";
      tablaSalida +=
        "<td><input type='button' value='Borrar' class='btnBorrarPedido' data-idpedido='" +
        respuesta.datos.order_id +
        "'></td>";
      tablaSalida += "</tr></tbody></table>";

      resultadoBusqueda.innerHTML = tablaSalida;
      resultadoBusqueda.style.display = "block";
      frmBuscarPedido.txtIDPedido.value = "";

      let btnBorrarPedidos = document.querySelectorAll(".btnBorrarPedido");
      btnBorrarPedidos.forEach((btn) => {
        btn.addEventListener("click", function (oEvento) {
          borrarPedido(oEvento);
        });
      });
    } else {
      alert(respuesta.mensaje);
    }
  }
}

function validarBuscarPedido() {
  let idPedido = parseInt(frmBuscarPedido.txtIDPedido.value.trim());
  let valido = true;
  let errores = "";

  if (isNaN(idPedido)) {
    valido = false;
    errores += "El identificador del pedido debe ser numérico";
  }

  if (!valido) {
    // Hay errores
    alert(errores);
  }

  return valido;
}

async function borrarPedido(oEvento) {
  let boton = oEvento.target;
  let idPedido = boton.dataset.idpedido;

  let respuesta = await oEmpresa.borrarPedido(idPedido);

  alert(respuesta.mensaje);

  if (!respuesta.error) {
    document.querySelector("#resultadoBusqueda").innerHTML = "";
  }
}

async function procesarBuscarPedidoDescripcion() {

  let descripcionPedido = frmBuscarPedidoDescripcion.lstDescripcion.value.trim();
  let respuesta = await oEmpresa.buscarPedidoPorDescripcion(descripcionPedido);

  if (!respuesta.error) {
    let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

    // Verificamos si hay datos en la respuesta
    if (respuesta.datos.length > 0) {
      // Escribimos resultado
      let tablaSalida =
        "<table class='table table-striped' id='listadoPorDescripcion'>";
      tablaSalida +=
        "<thead><tr><th>ID</th><th>DESCRIPCION</th><th>FECHA</th><th>PRECIO</th></th><th>ID CLIENTE</th><tr></thead>";
      tablaSalida += "<tbody>";

      // Iteramos sobre cada resultado
      for (let pedido of respuesta.datos) {
        tablaSalida += "<tr>";
        tablaSalida += "<td>" + pedido.order_id + "</td>";
        tablaSalida += "<td>" + pedido.order_description + "</td>";
        tablaSalida += "<td>" + pedido.order_date + "</td>";
        tablaSalida += "<td>" + pedido.order_total_amount + "</td>";
        tablaSalida += "<td>" + pedido.customer_id + "</td>";
        tablaSalida +=
        "<td><button class='btn btn-primary' data-pedido='" +
          JSON.stringify(pedido) +
          "'><i class='bi bi-pencil-square'></i></button></td></tr>";
        tablaSalida += "</tr>";
      }

      tablaSalida += "</tbody></table>";

      resultadoBusqueda.innerHTML = tablaSalida;
      resultadoBusqueda.style.display = "block";

      document
        .querySelector("#listadoPorDescripcion")
        .addEventListener("click", procesarBotonEditarPedido);

    } else {
      alert("No se encontraron pedidos con esa descripcion.");
    }
  } else {
    alert(respuesta.mensaje);
  }
}

function procesarBotonEditarPedido(oEvento) {
  let boton = null;

  // Verificamos si han hecho clic sobre el botón o el icono
  if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "button") {
    if (oEvento.target.nodeName == "I") {
      // Pulsacion sobre el icono
      boton = oEvento.target.parentElement; // El padre es el boton
    } else {
      boton = oEvento.target;
    }

    // 1.Ocultar todos los formularios
    ocultarFormularios();
    // 2.Mostrar el formulario de modificación de componentes
    frmEditarPedido.style.display = "block";
    // 3. Rellenar los datos de este formulario con los del componente
    let pedido = JSON.parse(boton.dataset.pedido);

    frmEditarPedido.txtModID.value = pedido.order_id;
    frmEditarPedido.txtModDescripcion.value = pedido.order_description;
    frmEditarPedido.txtModFecha.value = pedido.order_date;
    frmEditarPedido.txtModPrecio.value = pedido.order_total_amount;
    actualizarDesplegableTipos(pedido.customer_id);
  }
}

async function procesarModificarPedido() {
  let id = parseInt(frmEditarPedido.txtModID.value.trim());
  let descripcion = frmEditarPedido.txtModDescripcion.value.trim();
  let fecha = frmEditarPedido.txtModFecha.value.trim();
  let precio = parseFloat(frmEditarPedido.txtModPrecio.value.trim());
  let idCliente = parseInt(frmEditarPedido.lstClienteMod.value);

  if (validarModPedido()) {
    let respuesta = await oEmpresa.modificarPedido(
      new Pedido(id, descripcion, fecha, precio, idCliente)
    );

    alert(respuesta.mensaje);

    if (!respuesta.error) {
      // Si NO hay error
      //Resetear formulario
      frmEditarPedido.reset();
      // Ocultar el formulario
      frmEditarPedido.style.display = "none";
    }
  }
}

function validarModPedido() {
  // Recuperar datos del formulario frmEditarCliente
    let idComponente = frmEditarPedido.txtModID.value.trim();
    let descripcion = frmEditarPedido.txtModDescripcion.value.trim();
    let fecha = frmEditarPedido.txtModFecha.value.trim();
    let precio = parseFloat(frmEditarPedido.txtModPrecio.value.trim());
    let tipo = parseInt(frmEditarPedido.lstClienteMod.value);

  let valido = true;
  let errores = "";

  if (precio < 0) {
    valido = false;
    errores += "El precio no puede ser negativo.\n";
  }

  if (descripcion.length === 0) {
    valido = false;
    errores += "La descripción del pedido no puede estar vacía.\n";
  }

  if (!valido) {
    // Hay errores
    alert(errores);
  }

  return valido;
}
