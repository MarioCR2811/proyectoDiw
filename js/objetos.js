    class Cliente {
        constructor(id,nombre, email, telefono, direccion) {
            this.id = id;
            this.nombre = nombre;
            this.email = email;
            this.telefono = telefono;
            this.direccion = direccion;
        }
    }

    class Pedido {
        constructor(id, descripcion, fecha, precio, idcliente) {
            this.id = id;
            this.descripcion = descripcion;
            this.fecha = fecha;
            this.precio = precio;
            this.idcliente = idcliente;
        }
    }

    class Empresa {
        async altaCliente(oCliente) {

            let datos = new FormData();

            datos.append("nombre", oCliente.nombre);
            datos.append("email", oCliente.email);
            datos.append("telefono", oCliente.telefono);
            datos.append("direccion", oCliente.direccion);

            let respuesta = await peticionPOST("alta_cliente.php", datos);

            return respuesta;
        }

        async buscarCliente(idCliente) {
            let datos = new FormData();

            datos.append("idcliente", idCliente);

            let respuesta = await peticionPOST("buscar_cliente.php", datos);

            return respuesta;
        }

        async listadoClientes() {
            let listado = "";

            let respuesta = await peticionGET("listado_clientes.php", new FormData());

            if (respuesta.error) {
                listado = respuesta.mensaje;    
            } else {
                listado = "<table class='table table-striped'>";
                listado += "<thead><tr><th>IDTIPO</th><th>NOMBRE</th><th>EMAIL</th></th><th>TELEFONO</th></th><th>DIRECCION</th></tr></thead>";
                listado += "<tbody>";

                for (let cliente of respuesta.datos) {
                    listado += "<tr><td>" + cliente.customer_id + "</td>";
                    listado += "<td>" + cliente.customer_name + "</td>";
                    listado += "<td>" + cliente.customer_email + "</td>";
                    listado += "<td>" + cliente.customer_telephone + "</td>";
                    listado += "<td>" + cliente.customer_direction + "</td></tr>";
                }
                listado += "</tbody></table>";
            }

            return listado;
        }

        async borrarCliente(idCliente) {
            let datos = new FormData();

            datos.append("idCliente", idCliente);

            let respuesta = await peticionPOST("borrar_cliente.php", datos);

            return respuesta;
        }

        async buscarClientePorDireccion(direccionCliente) {
            let datos = new FormData();

            datos.append("direccionCliente", direccionCliente);

            let respuesta = await peticionPOST("listado_clientes_parametro.php", datos);

            return respuesta;
        }

        async getClientes() {
            let datos = new FormData();
    
            let respuesta = await peticionGET("get_clientes.php", datos);
    
            return respuesta;
        }

        async modificarCliente(oCliente) {
            let datos = new FormData();
    
            // Se podría pasar campo a campo al servidor
            // pero en esta ocasión vamos a pasar todos los datos 
            // en un solo parámetro cuyos datos van en formato JSON
            datos.append("cliente",JSON.stringify(oCliente));
           
            let respuesta = await peticionPOST("modificar_cliente.php", datos);
    
            return respuesta;
        }

        async altaPedido(oPedido) {
            let datos = new FormData();
    
            datos.append("descripcion", oPedido.descripcion);
            datos.append("fecha", oPedido.fecha);
            datos.append("precio", oPedido.precio);
            datos.append("idcliente", oPedido.idcliente);
    
            let respuesta = await peticionPOST("alta_pedido.php", datos);
    
            return respuesta;
        }

        async borrarPedido(idPedido) {
            let datos = new FormData();

            datos.append("idPedido", idPedido);

            let respuesta = await peticionPOST("borrar_pedido.php", datos);

            return respuesta;
        }

        async buscarPedido(idPedido) {
            let datos = new FormData();

            datos.append("idPedido", idPedido);

            let respuesta = await peticionPOST("buscar_pedido.php", datos);

            return respuesta;
        }

        async listadoPedidos() {
            let listado = "";

            let respuesta = await peticionGET("listado_pedidos.php", new FormData());

            if (respuesta.error) {
                listado = respuesta.mensaje;    
            } else {
                listado = "<table class='table table-striped'>";
                listado += "<thead><tr><th>IDTIPO</th><th>DESCRIPCION</th><th>FECHA</th></th><th>PRECIO</th></th><th>IDCLIENTE</th></tr></thead>";
                listado += "<tbody>";

                for (let pedido of respuesta.datos) {
                    listado += "<tr><td>" + pedido.order_id + "</td>";
                    listado += "<td>" + pedido.order_description + "</td>";
                    listado += "<td>" + pedido.order_date + "</td>";
                    listado += "<td>" + pedido.order_total_amount + "</td>";
                    listado += "<td>" + pedido.customer_id + "</td></tr>";
                }
                listado += "</tbody></table>";
            }

            return listado;
        }

        async getPedidos() {
            let datos = new FormData();
    
            let respuesta = await peticionGET("get_pedidos.php", datos);
    
            return respuesta;
        }

        async buscarPedidoPorDescripcion(descripcionPedido) {
            let datos = new FormData();

            datos.append("descripcionPedido", descripcionPedido);

            let respuesta = await peticionPOST("buscar_pedido_descripcion.php", datos);

            return respuesta;
        }

        async modificarPedido(oPedido) {
            let datos = new FormData();
    
            // Se podría pasar campo a campo al servidor
            // pero en esta ocasión vamos a pasar todos los datos 
            // en un solo parámetro cuyos datos van en formato JSON
            datos.append("pedido",JSON.stringify(oPedido));
           
            let respuesta = await peticionPOST("modificar_pedido.php", datos);
    
            return respuesta;
        }
    }