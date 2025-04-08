//Carusel
let items = document.querySelectorAll('.carousel .carousel-item')

items.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling
    for (var i=1; i<minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
        	next = items[0]
      	}
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})

//Productos
const productos = [
    {
        id: "lata-222",
        titulo: 'Lata "2/22"',
        imagen: "recursos/images/222_lata.png",
        precio: 1500,
        cantidad: 0,
        tipo: "Bebida",
        descrp: "Este té helado, influenciado por la creatividad única de Melanie Martínez, es una sinfonía de sabores refrescantes y encanto artístico. La estética visual de este té se completa con toques de lavanda y manzanilla, que evocan la delicadeza de la música de Melanie. Estas hierbas no solo añaden un toque floral, sino que también brindan un matiz relajante a la mezcla. Sin añadidos de gas ni de alcohol, este brebaje invita a sumergirse en el mundo creativo de la artista."
    },
    {
        id: "lata-blood",
        titulo: 'Lata "Bloodshot"',
        imagen: "recursos/images/blodshoot_lata.png",
        precio: 1500,
        cantidad: 0,
        tipo: "Bebida",
        descrp: "Este té helado, inspirado en la creatividad de Melanie Martínez, fusiona la intensidad del hibisco con la frescura de frutas tropicales. Las notas ácidas y afrutadas se entrelazan, creando una experiencia vibrante. Sin gas ni alcohol, este té refrescante rinde homenaje al estilo único de Melanie, ofreciendo un deleite floral y frutal en cada sorbo."
    },
    {
        id: "lata-enchant",
        titulo: 'Lata "Enchanted"',
        imagen: "recursos/images/enchanted_lata.png",
        precio: 1500,
        cantidad: 0,
        tipo: "Bebida",
        descrp: "Este té helado es una armoniosa mezcla de jengibre, limón refrescante y miel dulce. La audacia del jengibre, con su toque picante, se entrelaza con la frescura cítrica del limón, creando una sinfonía de sabores en cada sorbo. La suavidad de la miel agrega una capa reconfortante y dulce, equilibrando la intensidad de la mezcla.. Sin gas ni alcohol, inspirado en la energía de Melanie Martinez, ofrece una experiencia revitalizante y deliciosa, una combinación perfecta de sabores que cautivan los sentidos."
    },
    {
        id: "lata-pp",
        titulo: 'Lata "Portals & petals"',
        imagen: "recursos/images/pp_lata.png",
        precio: 1500,
        cantidad: 0,
        tipo: "Bebida",
        descrp: "Este té helado, inspirado en la singularidad de Melanie Martinez, lleva la pureza del matcha a una experiencia melódica. La intensidad y elegancia del matcha se entrelazan en una armonía refrescante. Sin distracciones, este té captura la esencia, ofreciendo un deleite verde y vibrante que resuena con el estilo distintivo de Melanie. Libre de gas y alcohol, es una indulgencia sutil y deliciosa para los amantes del matcha y la creatividad melódica."
    },
    {
        id: "longsleeve",
        titulo: 'Longsleeve',
        imagen: "recursos/images/Longsleeve.png",
        precio: 20000,
        cantidad: 0,
        tipo: "Merch",
        talle: "",
    },
    {
        id: "mesh-top-1",
        titulo: 'Mesh Top',
        imagen: "recursos/images/mesh_top.png",
        precio: 12000,
        cantidad: 0,
        tipo: "Merch",
        talle: "",
    },
    {
        id: "mesh-top-2",
        titulo: 'Mesh Top',
        imagen: "recursos/images/mesh_top_2.png",
        precio: 12000,
        cantidad: 0,
        tipo: "Merch",
        talle: "",
    },
    {
        id: "mesh-top-3",
        titulo: 'Mesh Top',
        imagen: "recursos/images/mesh_top_3.png",
        precio: 12000,
        cantidad: 0,
        tipo: "Merch",
        talle: "",
    },
    {
        id: "ring",
        titulo: 'Portals Ring',
        imagen: "recursos/images/ring.png",
        precio: 3500,
        cantidad: 0,
        tipo: "Merch",
        talle: 0,
    },
    {
        id: "pendiente-falso",
        titulo: 'Pendientes falso orejas',
        imagen: "recursos/images/pendientes.png",
        precio: 4500,
        cantidad: 0,
        tipo: "Merch",
    },
    {
        id: "cd",
        titulo: 'Portals - CD',
        imagen: "recursos/images/cd.png",
        precio: 8000,
        cantidad: 0,
        tipo: "Música",
    },
    {
        id: "vinilo",
        titulo: 'Portals - Vinilo',
        imagen: "recursos/images/vinilo_bloodshot.png",
        precio: 20000,
        cantidad: 0,
        tipo: "Música",
    },
];

const contenedorProductos =  document.querySelector("#contenedor-productos");
const numerito = document.querySelector("#numerito");

function cargarProductos () {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <button class="boton-detalle" onclick="productoDetalle('${producto.id}')">
            <img src="${producto.imagen}" class="producto-imagen" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h5 class="producto-titulo">${producto.titulo}</h5>
                <p class="producto-precio">$${producto.precio}</p>
                ${producto.talle !== undefined ? 
                    `<button class="producto-seleccionar" onclick="productoDetalle('${producto.id}')">Seleccionar talle</button>` :
                    `<button class="producto-agregar" id="${producto.id}">Añadir</button>`
                }
            </div>
            </button>
        `;
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
}

cargarProductos();

function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNum();
} else {
    productosEnCarrito = [];
};


function agregarAlCarrito(e) {
    const idBtn = e.currentTarget.id;
    const productoBase = productos.find(producto => producto.id === idBtn);

    let productoAgregado = {...productoBase};

    if (productoAgregado.talle !== undefined) {
        let talleSeleccionado;

        if (productoAgregado.tipo === "Merch") {
            talleSeleccionado = document.querySelector(`input[name="ropa"]:checked`);
        } else if (productoAgregado.tipo === "Accesorio") {
            talleSeleccionado = document.querySelector(`input[name="acc"]:checked`);
        }

        if (talleSeleccionado){
            productoAgregado.talle = talleSeleccionado.value;
            productoAgregado.id = `${productoBase.id}-${talleSeleccionado.value}`;
        
        }
    }

    const productoExistente = productosEnCarrito.find(p => p.id === productoAgregado.id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNum();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
}

function actualizarNum () {
    let nuevoNum = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNum;
}

//Detalle
const contenedorDetalles =  document.querySelector("#contenedor-detalles");
const contenedorRelacionados = document.querySelector("#contenedor-relacionado");

function productoDetalle(idDetalle) {
    const productoDetalle = productos.find(p => p.id === idDetalle);
    const botonAgregar = document.querySelector(".producto-agregar-detalle");
    const detalleOpcAcc = document.querySelector(".detalle-opciones-acc");
    const detalleOpcRopa = document.querySelector(".detalle-opciones-ropa");
    const detalleDescrp = document.getElementById("detalle-descp");
    if (productoDetalle) {
        document.getElementById("detalle-imagen").src = productoDetalle.imagen;
        document.getElementById("detalle-imagen").alt = productoDetalle.id;
        document.getElementById("detalle-titulo").textContent = productoDetalle.titulo;
        document.getElementById("detalle-precio").textContent = `$${productoDetalle.precio}`;

        botonAgregar.id = `${productoDetalle.id}`;

        if (productoDetalle.tipo === "Merch") {
            if (productoDetalle.id === "ring") {
                detalleOpcAcc.classList.remove("disabled");
                detalleOpcRopa.classList.add("disabled");
            } else if (productoDetalle.id !== "pendiente-falso" && productoDetalle.id !== "ring") {
                detalleOpcRopa.classList.remove("disabled");
                detalleOpcAcc.classList.add("disabled");
            } else if (productoDetalle.id === "pendiente-falso"){
                detalleOpcAcc.classList.add("disabled");
                detalleOpcRopa.classList.add("disabled");
            }
        } else {
            detalleOpcAcc.classList.add("disabled");
            detalleOpcRopa.classList.add("disabled");
        }
        
        if (productoDetalle.tipo === "Bebida") {
            detalleDescrp.classList.remove("disabled");
            detalleDescrp.textContent = productoDetalle.descrp;
        } else if (productoDetalle.tipo !== "Bebida"){
            detalleDescrp.classList.add("disabled");
        }

        mostrarRelacionados(productoDetalle.tipo, idDetalle);

        actualizarBotonesDetalle();
        window.scrollTo(0, 0);
        contenedorProductos.classList.add("disabled");
        contenedorDetalles.classList.remove("disabled");
        contenedorRelacionados.classList.remove("disabled");
    };

}

function mostrarRelacionados(tipo, idActual) {
    const objetosRelacionados = document.getElementById("objetos-relacionados");
    objetosRelacionados.innerHTML = "";

    const productosRelacionados = productos.filter(p => p.tipo === tipo && p.id !== idActual);

    productosRelacionados.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("relacionado");
        div.innerHTML = `
        <button onclick="productoDetalle('${producto.id}')">
              <img src="${producto.imagen}" class="relacionado-imagen" alt="${producto.id}">
              <h5 class="relacionado-titulo">${producto.titulo}</h5>
              <p class="relacionado-precio">$${producto.precio}</p>
        </button>
        `;
        objetosRelacionados.appendChild(div);
    })
};

function actualizarBotonesDetalle() {
    botonesDetalles = document.querySelectorAll(".producto-agregar-detalle");

    botonesDetalles.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

function ocultarDetalle() {
    contenedorProductos.classList.remove("disabled");
    contenedorDetalles.classList.add("disabled");
    contenedorRelacionados.classList.add("disabled");
}
