// features/pos/screens/cart_screen.dart
import 'package:flutter/material.dart';
import 'package:ecommerce_admin_app/core/models/product.dart';

class CartItem {
  final Product product;
  int quantity;
  double get subtotal => product.price * quantity;

  CartItem({
    required this.product,
    this.quantity = 1,
  });
}

class CartScreen extends StatefulWidget {
  const CartScreen({super.key});

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  final List<CartItem> _cartItems = [];

  double get _totalAmount {
    return _cartItems.fold(0, (sum, item) => sum + item.subtotal);
  }

  int get _totalItems {
    return _cartItems.fold(0, (sum, item) => sum + item.quantity);
  }

  void _addToCart(Product product) {
    final existingIndex = _cartItems.indexWhere((item) => item.product.barcode == product.barcode);
    
    setState(() {
      if (existingIndex >= 0) {
        // Si ya existe, aumentar cantidad
        _cartItems[existingIndex].quantity++;
      } else {
        // Si no existe, agregar nuevo item
        _cartItems.add(CartItem(product: product));
      }
    });

    // Mostrar confirmación
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('${product.name} agregado al carrito'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _removeFromCart(int index) {
    setState(() {
      _cartItems.removeAt(index);
    });
  }

  void _updateQuantity(int index, int newQuantity) {
    if (newQuantity <= 0) {
      _removeFromCart(index);
      return;
    }

    setState(() {
      _cartItems[index].quantity = newQuantity;
    });
  }

  void _clearCart() {
    setState(() {
      _cartItems.clear();
    });
  }

  void _processSale() {
    if (_cartItems.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('El carrito está vacío')),
      );
      return;
    }

    // Mostrar diálogo de confirmación
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Confirmar Venta'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Total: \$${_totalAmount.toStringAsFixed(2)}'),
            Text('Artículos: $_totalItems'),
            const SizedBox(height: 10),
            const Text('¿Procesar la venta?'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _completeSale();
            },
            child: const Text('Confirmar'),
          ),
        ],
      ),
    );
  }

  void _completeSale() {
    // Aquí iría la lógica para procesar la venta en el backend
    // Por ahora solo mostramos un mensaje de éxito
    
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Venta procesada por \$${_totalAmount.toStringAsFixed(2)}'),
        backgroundColor: Colors.green,
        duration: const Duration(seconds: 3),
      ),
    );

    // Limpiar carrito después de la venta
    _clearCart();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Carrito de Compras'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
        actions: [
          if (_cartItems.isNotEmpty)
            IconButton(
              icon: const Icon(Icons.delete_sweep),
              onPressed: _clearCart,
              tooltip: 'Vaciar carrito',
            ),
        ],
      ),
      body: Column(
        children: [
          // Resumen del carrito
          if (_cartItems.isNotEmpty)
            Container(
              padding: const EdgeInsets.all(16),
              color: Colors.blue[50],
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Total: \$${_totalAmount.toStringAsFixed(2)}',
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    '$_totalItems artículo${_totalItems != 1 ? 's' : ''}',
                    style: const TextStyle(
                      fontSize: 16,
                      color: Colors.grey,
                    ),
                  ),
                ],
              ),
            ),

          // Lista de productos
          Expanded(
            child: _cartItems.isEmpty
                ? const Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.shopping_cart_outlined, size: 80, color: Colors.grey),
                        SizedBox(height: 20),
                        Text(
                          'Carrito Vacío',
                          style: TextStyle(fontSize: 20, color: Colors.grey),
                        ),
                        SizedBox(height: 10),
                        Text(
                          'Agrega productos escaneando códigos de barras',
                          textAlign: TextAlign.center,
                          style: TextStyle(color: Colors.grey),
                        ),
                      ],
                    ),
                  )
                : ListView.builder(
                    itemCount: _cartItems.length,
                    itemBuilder: (context, index) {
                      final item = _cartItems[index];
                      return _buildCartItem(item, index);
                    },
                  ),
          ),

          // Botón de procesar venta
          if (_cartItems.isNotEmpty)
            Container(
              padding: const EdgeInsets.all(16),
              child: ElevatedButton(
                onPressed: _processSale,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  minimumSize: const Size(double.infinity, 50),
                ),
                child: const Text(
                  'PROCESAR VENTA',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildCartItem(CartItem item, int index) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: Colors.blue[100],
          child: Text(
            item.quantity.toString(),
            style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.blue),
          ),
        ),
        title: Text(
          item.product.name,
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Código: ${item.product.barcode}'),
            Text('Precio: \$${item.product.price.toStringAsFixed(2)} c/u'),
            Text(
              'Subtotal: \$${item.subtotal.toStringAsFixed(2)}',
              style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.green),
            ),
          ],
        ),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Botón para disminuir cantidad
            IconButton(
              icon: const Icon(Icons.remove, size: 20),
              onPressed: () => _updateQuantity(index, item.quantity - 1),
              style: IconButton.styleFrom(
                backgroundColor: Colors.red[50],
              ),
            ),
            
            // Cantidad actual
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey),
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(
                item.quantity.toString(),
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
            
            // Botón para aumentar cantidad
            IconButton(
              icon: const Icon(Icons.add, size: 20),
              onPressed: () => _updateQuantity(index, item.quantity + 1),
              style: IconButton.styleFrom(
                backgroundColor: Colors.green[50],
              ),
            ),
            
            // Botón para eliminar
            IconButton(
              icon: const Icon(Icons.delete, color: Colors.red),
              onPressed: () => _removeFromCart(index),
            ),
          ],
        ),
      ),
    );
  }
}