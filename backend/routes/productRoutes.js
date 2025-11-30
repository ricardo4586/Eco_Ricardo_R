// En backend/routes/productRoutes.js - Agrega logging
router.post('/', (req, res) => {
    console.log('📥 POST /api/productos - Datos recibidos:', req.body);
    
    const { nombre, descripcion, precio, barcode, id_numerico, stock, categoria, imagen } = req.body;
    
    // Validaciones básicas
    if (!nombre || !precio || !barcode || !id_numerico || !stock || !categoria) {
        console.log('❌ Faltan campos obligatorios');
        return res.status(400).json({
            success: false,
            message: 'Faltan campos obligatorios: nombre, precio, barcode, id_numerico, stock, categoria'
        });
    }

    const nuevoProducto = {
        id: productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1,
        nombre,
        descripcion: descripcion || '',
        precio: parseFloat(precio),
        barcode,
        id_numerico,
        stock: parseInt(stock),
        categoria,
        imagen: imagen || ''
    };
    
    productos.push(nuevoProducto);
    console.log('✅ Producto creado:', nuevoProducto);
    
    res.status(201).json({
        success: true,
        data: nuevoProducto,
        message: 'Producto creado correctamente'
    });
});

router.put('/:id', (req, res) => {
    console.log('📥 PUT /api/productos/' + req.params.id + ' - Datos recibidos:', req.body);
    
    const productId = parseInt(req.params.id);
    const { nombre, descripcion, precio, barcode, id_numerico, stock, categoria, imagen } = req.body;
    
    const index = productos.findIndex(p => p.id === productId);
    
    if (index === -1) {
        console.log('❌ Producto no encontrado ID:', productId);
        return res.status(404).json({
            success: false,
            message: 'Producto no encontrado'
        });
    }
    
    // Actualizar el producto
    productos[index] = {
        ...productos[index],
        nombre: nombre || productos[index].nombre,
        descripcion: descripcion || productos[index].descripcion,
        precio: precio ? parseFloat(precio) : productos[index].precio,
        barcode: barcode || productos[index].barcode,
        id_numerico: id_numerico || productos[index].id_numerico,
        stock: stock ? parseInt(stock) : productos[index].stock,
        categoria: categoria || productos[index].categoria,
        imagen: imagen || productos[index].imagen
    };
    
    console.log('✅ Producto actualizado:', productos[index]);
    
    res.json({
        success: true,
        data: productos[index],
        message: 'Producto actualizado correctamente'
    });
});