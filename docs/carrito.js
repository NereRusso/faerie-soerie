let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);
const contenedorCarVacio = document.querySelector("#carrito-vacio");
const contenedorCarProductos = document.querySelector("#carrito-productos");
const contenedorCarAcciones = document.querySelector("#carrito-acciones");
let botonesEliminar = document.querySelectorAll(".carrito-productos-eliminar");
const contenedorTotal = document.querySelector("#total");

function cargarProductosCarrito () {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
    contenedorCarVacio.classList.add("disabled");
    contenedorCarProductos.classList.remove("disabled");
    contenedorCarAcciones.classList.remove("disabled");

    contenedorCarProductos.innerHTML = "";

    productosEnCarrito.forEach(producto => {
        const li = document.createElement("li");
        li.classList.add("carrito-producto");

        let detalleTalle = producto.talle ? `${producto.talle}` : "";
        li.innerHTML = `
        <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-ticantprecio">
              <div class="carrito-producto-titulo">
                <h4>${producto.titulo} ${detalleTalle}</h4>
                
              </div>
              <div class="carrito-producto-cantprecio">
                <div class="carrito-producto-cantidad">
                  <p>${producto.cantidad}</p>
                </div>
                <p>x</p>
                <div class="carrito-producto-precio">
                  <p>$${producto.precio}</p>
                </div>
              </div>
            </div>
            <div class="carrito-producto-subtotal">
              <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
        `
        contenedorCarProductos.append(li);
    });
    /*Mercado Pago*/
const mp = new MercadoPago("APP_USR-8d2e3871-bb18-49d5-b976-00205f1cf7e6", {
  locate: "es-AR",
});

totalPagar = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
const generarDescpCar = () => {
  return productosEnCarrito.map(producto => `${producto.titulo} (x${producto.cantidad})`).join(", ")
}

document.getElementById("pagar").addEventListener("click", async () => {
  try {
    // Mostrar mensaje de carga
    const mensajeCargando = document.getElementById("mensaje-cargando");
    mensajeCargando.style.display = "block";

    const orderData = {
      title: generarDescpCar(),
      quantity: 1,
      price: totalPagar,
    };

    const response = await fetch("http://localhost:3000/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const preference = await response.json();
    createCheckoutButton(preference.id);

  } catch (error) {
    alert("error :(");
  }
});

const createCheckoutButton = (preferenceId) => {
  const bricksBuilder = mp.bricks();

  const renderComponent = async () => {
    if (window.checkoutButton) window.checkoutButton.unmount();

    window.checkoutButton = await bricksBuilder.create("wallet", "wallet_container", {
      initialization: {
        preferenceId: preferenceId,
      },
    });

    // Ocultar el mensaje "Cargando pago..."
    const mensajeCargando = document.getElementById("mensaje-cargando");
    mensajeCargando.style.display = "none";
  };

  renderComponent();
};


/*Fin Mercado Pago*/

    }  else {
    contenedorCarVacio.classList.remove("disabled");
    contenedorCarProductos.classList.add("disabled");
    contenedorCarAcciones.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const success = params.get("success");
  const fail = params.get("failure");
  const pend = params.get("pending");

  if (success === "true") {
    const modalBootstrap = new bootstrap.Modal(document.getElementById("modalExito"));
    modalBootstrap.show();

    // Limpiar carrito visual y en localStorage
    productosEnCarrito = []; // Vacía el array
    localStorage.removeItem("productos-en-carrito");

    // Vuelve a renderizar el carrito vacío
    cargarProductosCarrito();

    // Limpia la URL para que no vuelva a aparecer el modal si refrescás
    window.history.replaceState({}, document.title, window.location.pathname);
  } else if (fail === "true") {
    const modalBootstrap = new bootstrap.Modal(document.getElementById("modalFallo"));
    modalBootstrap.show();

    window.history.replaceState({}, document.title, window.location.pathname);
  } else if (pend === "true") {
    const modalBootstrap = new bootstrap.Modal(document.getElementById("modalPend"));
    modalBootstrap.show();
    
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});


function actualizarBotonesEliminar () {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarCar);
    });
}

function eliminarCar(e){
    const idBtn = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBtn);
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}