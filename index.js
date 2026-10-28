
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para recibir datos en formato JSON
app.use(express.json());

// Lista de productos de la cafeteria
const productos = [
    { id: 1, nombre: 'Cafe con leche', precio: 1800, categoria: 'bebida' },
    { id: 2, nombre: 'Medialuna', precio: 900, categoria: 'comida' },
    { id: 3, nombre: 'Tostado de jamon y queso', precio: 3500, categoria: 'comida' },
    { id: 4, nombre: 'Agua mineral', precio: 1200, categoria: 'bebida' }
];

// Ruta principal
app.get('/', (req, res) => {
    res.send('API de la Cafeteria del CRUI funcionando');
});

// Obteneos todos los productos o filtrarmos por categoria
app.get('/api/productos', (req, res) => {
    const categoria = req.query.categoria;

    if (categoria) {
        const filtrados = productos.filter(
            p => p.categoria === categoria
        );

        return res.json(filtrados);
    }

    res.json(productos);
});

// Buscamos un producto por ID
app.get('/api/productos/:id', (req, res) => {
    const id = Number(req.params.id);
    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        });
    }

    res.json(producto);
});

// Agregamos un producto nuevo
app.post('/api/productos', (req, res) => {
    const { nombre, precio, categoria } = req.body;

    // Validamos que el nombre sea obligatorio
    if (typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({
            error: 'El nombre es obligatorio'
        });
    }

    // Validamos que el precio sea un numero mayor que cero
    if (
        typeof precio !== 'number' ||
        !Number.isFinite(precio) ||
        precio <= 0
    ) {
        return res.status(400).json({
            error: 'El precio debe ser un numero mayor a 0'
        });
    }

    // se creae el nuevo producto con un ID nuevo
    const nuevoProducto = {
        id: productos.length > 0
            ? Math.max(...productos.map(p => p.id)) + 1
            : 1,
        nombre: nombre.trim(),
        precio: precio,
        categoria: categoria
    };

    // Guardar el producto en el array
    productos.push(nuevoProducto);

    // Responde con codigo 201
    res.status(201).json(nuevoProducto);
});

// Modificamos un producto existente por ID, que seria el PUT
app.put('/api/productos/:id', (req, res) => {
    // Obtenemos el ID enviado en la URL
    const id = Number(req.params.id);

    // Buscar el producto dentro del array
    const producto = productos.find(p => p.id === id);

    // Verificamos si en velda existe
    if (!producto) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        });
    }

    // Obtenenemos los nuevos datos enviados en el body
    const { nombre, precio, categoria } = req.body;

    // Validamos que el nombre sea obligatorio
    if (typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({
            error: 'El nombre es obligatorio'
        });
    }

    // esto Valida que el precio sea un numero mayor que cero
    if (
        typeof precio !== 'number' ||
        !Number.isFinite(precio) ||
        precio <= 0
    ) {
        return res.status(400).json({
            error: 'El precio debe ser un numero mayor a 0'
        });
    }

    // esto actualiza los datos del producto
    producto.nombre = nombre.trim();
    producto.precio = precio;
    producto.categoria = categoria;

    // esto te devuelve el producto actualizado
    res.json({
        mensaje: 'Producto actualizado correctamente',
        producto: producto
    });
});

// BONUS 2: Eliminar un producto por ID
app.delete('/api/productos/:id', (req, res) => {
    const id = Number(req.params.id);
    const indice = productos.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        });
    }

    const eliminado = productos.splice(indice, 1);

    res.json({
        mensaje: 'Producto eliminado correctamente',
        producto: eliminado[0]
    });
});

// BONUS 3: Resumen de la cafeteria
app.get('/api/resumen', (req, res) => {
    const cantidad = productos.length;

    const sumaPrecios = productos.reduce(
        (total, producto) => total + producto.precio,
        0
    );

    const precioPromedio = cantidad > 0
        ? sumaPrecios / cantidad
        : 0;

    res.json({
        cantidad: cantidad,
        precioPromedio: precioPromedio
    });
});

// esto es para prender el server
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
