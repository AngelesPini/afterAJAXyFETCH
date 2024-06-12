/*tenemos en JS dos tipos d epeticiones que pueden ser GET & POST*/


//La peticion GET: hace referencia a la solicitud de una API.

// La peticion POST: hace referencia a la solicitud de un JSON.


//Fetch con peticion GET:

/*const personajes = document.getElementById('personajes')

const url = 'https://rickandmortyapi.com/api/character'

fetch(url)
    .then((res) => res.json())
    .then((data) =>{

        let characters = ""
        console.log(data)

        data.results.map((i) =>{
            characters += `

                <div class="card">
                <p>${i.id}</p>
                <p>${i.name}</p>
                <p>${i.species}</p> 
                </div>
            `

            personajes.innerHTML = characters
        })

    })

    .catch((e) => console.log(e))*/


//Fetch con método POST: 

let carrito = []

function cargarProductos(){
    return fetch('productos.json')
        .then(response => {
            if (!response.ok){
                console.log("ERROR")
            }
            return response.json()
        })
        .then(data => {
            return data

        })
        .catch(error => {
            console.error('Hubo un error con la solicitud', error)
        })
}

function mostrarProductos(productos){
    const productosContainer = document.getElementById('productos-container')

        productos.forEach(producto => {

            const productosDiv = document.createElement('div')

            productosDiv.innerHTML = `
            <h2>Producto: ${producto.nombre}</h2>
            <p>Precio: $ ${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            `
            productosContainer.appendChild(productosDiv)
        });
}

function agregarAlCarrito(id){
    cargarProductos().then(productos => {
        const producto = productos.find(prod => prod.id === id)

        if (producto){
            const productoEnCarrito = carrito.find(item => item.id === id)
            if(productoEnCarrito){
                productoEnCarrito.cantidad++
                alert('Producto agregado')
            }else{
                carrito.push({...producto, cantidad: 1})
                alert('Producto agregado')
            }
            mostrarCarrito()
        } else{
            console.log('Producto inexistente o no encontrado')
        }

    })
}

function mostrarCarrito(){

    const carritoContainer = document.getElementById('carrito-container')
    carritoContainer.innerHTML = ''

    carrito.forEach(item =>{
        const itemDiv = document.createElement('div')
        itemDiv.innerHTML = 
        `
            <h2>Producto: ${item.nombre}</h2>
            <p>Precio: $ ${item.precio}</p>
            <p>Cantidad: ${item.cantidad}</p>          
            <button>Eliminar producto</button>
            
        `
        carritoContainer.appendChild(itemDiv)
    })
}


document.addEventListener('DOMContentLoaded',() =>{
    cargarProductos().then(productos =>{
        mostrarProductos(productos)
    })
})




