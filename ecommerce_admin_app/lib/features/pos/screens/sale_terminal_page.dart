import 'package:flutter/material.dart';
import 'package:ecommerce_admin_app/core/models/product.dart';
import 'package:ecommerce_admin_app/core/services/api_service.dart';
import 'package:ecommerce_admin_app/features/auth/screens/login_page.dart';
import 'package:ecommerce_admin_app/features/product_scan/screens/scanner_view.dart'; // Reutilizamos el scanner

class SaleTerminalPage extends StatefulWidget {
  const SaleTerminalPage({super.key});

  @override
  State<SaleTerminalPage> createState() => _SaleTerminalPageState();
}

class _SaleTerminalPageState extends State<SaleTerminalPage> {
  // Lista para almacenar los productos en el carrito (permite duplicados para representar cantidad)
  final List<Product> _scannedProducts = [];
  bool _isSearching = false;

  // Calcula la suma total de los precios de los productos en el carrito
  double get _totalAmount {
    return _scannedProducts.fold(0.0, (sum, item) => sum + item.price);
  }

  // --- Lógica de Escaneo ---
  Future<void> _scanBarcode() async {
    final barcode = await Navigator.of(context).push(
      MaterialPageRoute(builder: (context) => const ScannerView()),
    );

    if (barcode != null && barcode is String) {
      _checkProductExistence(barcode);
    }
  }

  // --- Lógica de Búsqueda de Producto ---
  Future<void> _checkProductExistence(String barcode) async {
    setState(() {
      _isSearching = true;
    });
    
    // El rol de Staff también puede buscar productos
    try {
      final product = await apiService.checkProductByBarcode(barcode);

      if (mounted) {
        if (product != null) {
          // Si el producto existe, lo añade al carrito
          setState(() {
            _scannedProducts.add(product);
          });
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('✅ ${product.name} añadido. Total: \$${_totalAmount.toStringAsFixed(2)}'),
              backgroundColor: Colors.green,
              duration: const Duration(seconds: 1),
            ),
          );
        } else {
          // Si no existe, muestra una advertencia (Staff no puede registrar)
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('⚠️ Producto no encontrado. Pida ayuda a un administrador.'),
              backgroundColor: Colors.orange,
              duration: Duration(seconds: 2),
            ),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('❌ Error al buscar producto: ${e.toString().replaceFirst('Exception: ', '')}'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isSearching = false;
        });
      }
    }
  }

  // --- Lógica para Eliminar Producto del Carrito ---
  void _removeProduct(int index) {
    if (mounted) {
      setState(() {
        final removedProduct = _scannedProducts.removeAt(index);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('🗑️ ${removedProduct.name} eliminado del carrito.'),
            backgroundColor: Colors.grey,
            duration: const Duration(seconds: 1),
          ),
        );
      });
    }
  }

  // --- Lógica para Cerrar Venta (Añadir Lógica de POST a /api/ventas) ---
  void _closeSale() {
    if (_scannedProducts.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('El carrito está vacío.'),
          backgroundColor: Colors.deepPurple,
        ),
      );
      return;
    }

    // Aquí iría la lógica final de POST a tu servidor
    // Ej: apiService.registerSale(_scannedProducts)
    
    // SIMULACIÓN DE CIERRE DE VENTA EXITOSO
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Venta Cerrada'),
        content: Text(
          'Total: \$${_totalAmount.toStringAsFixed(2)}. \n\nLógica de envío de datos a /api/ventas pendiente.',
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          TextButton(
            onPressed: () {
              // Limpiar carrito y cerrar diálogo
              setState(() {
                _scannedProducts.clear();
              });
              Navigator.of(context).pop();
            },
            child: const Text('Nueva Venta'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Staff: Terminal de Venta'),
        backgroundColor: Colors.blueGrey,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              apiService.logout();
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (context) => const LoginPage()),
              );
            },
          ),
        ],
      ),
      
      // --- Cuerpo Principal con Carrito y Total ---
      body: Column(
        children: [
          // 1. Botón de Escaneo (Parte superior)
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: ElevatedButton.icon(
              onPressed: _isSearching ? null : _scanBarcode,
              icon: _isSearching 
                  ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) 
                  : const Icon(Icons.qr_code_scanner),
              label: Text(_isSearching ? 'Buscando...' : 'Escanear Producto y Sumar'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.teal.shade500,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.all(20),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                textStyle: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
          ),

          // 2. Título de Carrito
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Artículos Escaneados:',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.blueGrey),
                ),
                Text(
                  '(${_scannedProducts.length} items)',
                  style: const TextStyle(fontSize: 16, color: Colors.grey),
                ),
              ],
            ),
          ),
          
          // 3. Lista de Productos Escaneados
          Expanded(
            child: _scannedProducts.isEmpty
                ? const Center(
                    child: Text(
                      'Carrito vacío. ¡Empieza a escanear!',
                      style: TextStyle(fontSize: 16, color: Colors.black54),
                    ),
                  )
                : ListView.builder(
                    itemCount: _scannedProducts.length,
                    itemBuilder: (context, index) {
                      final product = _scannedProducts[index];
                      return Dismissible(
                        key: ValueKey(product.barcode + index.toString()), // Clave única para eliminar
                        direction: DismissDirection.endToStart,
                        onDismissed: (direction) {
                          _removeProduct(index);
                        },
                        background: Container(
                          color: Colors.red,
                          alignment: Alignment.centerRight,
                          padding: const EdgeInsets.only(right: 20.0),
                          child: const Icon(Icons.delete, color: Colors.white),
                        ),
                        child: Card(
                          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                          elevation: 1,
                          child: ListTile(
                            leading: const Icon(Icons.sell, color: Colors.teal),
                            title: Text(product.name),
                            subtitle: Text('Código: ${product.barcode}'),
                            trailing: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Text(
                                  '\$${product.price.toStringAsFixed(2)}',
                                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                                ),
                                IconButton(
                                  icon: const Icon(Icons.remove_circle_outline, color: Colors.red),
                                  onPressed: () => _removeProduct(index),
                                ),
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                  ),
          ),

          // 4. Pie de página (Total y Botón de Venta)
          Container(
            padding: const EdgeInsets.all(16.0),
            decoration: BoxDecoration(
              color: Colors.blueGrey.shade50,
              border: Border(top: BorderSide(color: Colors.grey.shade300)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('TOTAL:', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
                    Text(
                      '\$${_totalAmount.toStringAsFixed(2)}',
                      style: TextStyle(
                        fontSize: 24, 
                        fontWeight: FontWeight.bold, 
                        color: Colors.teal.shade700
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 15),
                ElevatedButton.icon(
                  onPressed: _closeSale,
                  icon: const Icon(Icons.payment),
                  label: const Text('Cerrar Venta'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.teal.shade600,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 15),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}