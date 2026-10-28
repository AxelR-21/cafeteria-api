--Consultas GET

Con el servidor iniciado en http://localhost:3000, se pueden realizar las siguientes consultas desde el navegador:

1. Ruta principal: http://localhost:3000/
2. Listar todos los productos: http://localhost:3000/api/productos
3. Consultar un producto por ID: http://localhost:3000/api/productos/2
4. Filtrar productos por categoría: http://localhost:3000/api/productos?categoria=bebida
5. Consultar resumen: http://localhost:3000/api/resumen

--Crear un producto (POST)

Desde la consola del navegador, ejecutar:

fetch('/api/productos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nombre: 'Alfajor',
        precio: 1100,
        categoria: 'comida'
    })
})
.then(res => res.json())
.then(data => console.log(data));

--Eliminar un producto (DELETE)

Desde la consola del navegador, ejecutar:

fetch('/api/productos/2', {
    method: 'DELETE'
})
.then(res => res.json())
.then(data => console.log(data));
