// features/pos/screens/scanner_screen.dart
import 'package:flutter/material.dart';
import 'package:ecommerce_admin_app/core/services/api_service.dart';
import 'package:ecommerce_admin_app/core/models/product.dart';

class ScannerScreen extends StatefulWidget {
  const ScannerScreen({super.key});

  @override
  State<ScannerScreen> createState() => _ScannerScreenState();
}

class _ScannerScreenState extends State<ScannerScreen> {
  final _barcodeController = TextEditingController();
  Product? _product;
  bool _isLoading = false;

  Future<void> _searchProduct() async {
    if (_barcodeController.text.isEmpty) return;
    
    setState(() {
      _isLoading = true;
      _product = null;
    });

    try {
      final product = await apiService.checkProductByBarcode(_barcodeController.text);
      setState(() {
        _product = product;
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  // Función para obtener el ícono de categoría
  String _getCategoryIcon(String category) {
    switch (category) {
      case 'supermercado':
        return '🛒';
      case 'electrodomesticos':
        return '🏠';
      case 'jugueteria':
        return '🧸';
      case 'tecnologia':
        return '💻';
      case 'bebidas':
        return '🥤';
      default:
        return '📦';
    }
  }

  // Función para obtener el color de categoría
  Color _getCategoryColor(String category) {
    switch (category) {
      case 'supermercado':
        return Colors.green;
      case 'electrodomesticos':
        return Colors.blue;
      case 'jugueteria':
        return Colors.orange;
      case 'tecnologia':
        return Colors.purple;
      case 'bebidas':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Escanear Producto'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Campo de búsqueda
            TextField(
              controller: _barcodeController,
              decoration: const InputDecoration(
                labelText: 'Código de Barras',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.qr_code),
                hintText: 'Ingresa o escanea un código de barras',
              ),
              onSubmitted: (_) => _searchProduct(),
            ),
            
            const SizedBox(height: 20),
            
            // Botón de búsqueda
            ElevatedButton.icon(
              onPressed: _isLoading ? null : _searchProduct,
              icon: _isLoading 
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : const Icon(Icons.search),
              label: Text(_isLoading ? 'Buscando...' : 'Buscar Producto'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blue,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                minimumSize: const Size(double.infinity, 50),
              ),
            ),
            
            const SizedBox(height: 20),
            
            // Indicador de carga
            if (_isLoading) ...[
              const Column(
                children: [
                  CircularProgressIndicator(),
                  SizedBox(height: 10),
                  Text('Buscando producto...'),
                ],
              ),
            ],
            
            // Resultado del producto encontrado
            if (_product != null) ...[
              const SizedBox(height: 20),
              const Text(
                'Producto Encontrado',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.green,
                ),
              ),
              const SizedBox(height: 10),
              Card(
                elevation: 4,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    children: [
                      // Header con categoría
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                            decoration: BoxDecoration(
                              color: _getCategoryColor(_product!.category).withOpacity(0.1),
                              borderRadius: BorderRadius.circular(20),
                              border: Border.all(
                                color: _getCategoryColor(_product!.category),
                                width: 1,
                              ),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Text(
                                  _getCategoryIcon(_product!.category),
                                  style: const TextStyle(fontSize: 16),
                                ),
                                const SizedBox(width: 6),
                                Text(
                                  apiService.getCategoryDisplayName(_product!.category),
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.bold,
                                    color: _getCategoryColor(_product!.category),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      
                      const SizedBox(height: 16),
                      
                      // Información del producto
                      ListTile(
                        contentPadding: EdgeInsets.zero,
                        leading: Container(
                          width: 50,
                          height: 50,
                          decoration: BoxDecoration(
                            color: Colors.blue.shade50,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Icon(
                            Icons.inventory_2,
                            color: Colors.blue,
                            size: 30,
                          ),
                        ),
                        title: Text(
                          _product!.name,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const SizedBox(height: 8),
                            Text(
                              'Código: ${_product!.barcode}',
                              style: const TextStyle(fontSize: 14),
                            ),
                            const SizedBox(height: 4),
                            Row(
                              children: [
                                const Icon(Icons.attach_money, size: 16, color: Colors.green),
                                const SizedBox(width: 4),
                                Text(
                                  'Precio: \$${_product!.price.toStringAsFixed(2)}',
                                  style: const TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.green,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 4),
                            Row(
                              children: [
                                const Icon(Icons.inventory, size: 16, color: Colors.orange),
                                const SizedBox(width: 4),
                                Text(
                                  'Stock: ${_product!.stock} unidades',
                                  style: const TextStyle(
                                    fontSize: 14,
                                    color: Colors.orange,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      
                      const SizedBox(height: 16),
                      
                      // Botones de acción
                      Row(
                        children: [
                          Expanded(
                            child: OutlinedButton.icon(
                              onPressed: () {
                                // TODO: Agregar al carrito
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text('${_product!.name} agregado al carrito'),
                                    backgroundColor: Colors.green,
                                  ),
                                );
                              },
                              icon: const Icon(Icons.add_shopping_cart),
                              label: const Text('Agregar al Carrito'),
                              style: OutlinedButton.styleFrom(
                                padding: const EdgeInsets.symmetric(vertical: 12),
                              ),
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: ElevatedButton.icon(
                              onPressed: () {
                                // Limpiar búsqueda
                                setState(() {
                                  _product = null;
                                  _barcodeController.clear();
                                });
                              },
                              icon: const Icon(Icons.search),
                              label: const Text('Nueva Búsqueda'),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.blue.shade50,
                                foregroundColor: Colors.blue,
                                padding: const EdgeInsets.symmetric(vertical: 12),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ],
            
            // Mensaje cuando no se encuentra producto
            if (!_isLoading && _barcodeController.text.isNotEmpty && _product == null) ...[
              const SizedBox(height: 20),
              Card(
                color: Colors.orange.shade50,
                child: const Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Column(
                    children: [
                      Icon(Icons.search_off, size: 50, color: Colors.orange),
                      SizedBox(height: 10),
                      Text(
                        'Producto No Encontrado',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.orange,
                        ),
                      ),
                      SizedBox(height: 8),
                      Text(
                        'Este código de barras no está registrado en el sistema.',
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Colors.orange),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
      
      // Botón flotante para escanear (opcional)
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // TODO: Integrar con cámara para escanear
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Función de escaneo con cámara próximamente')),
          );
        },
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
        child: const Icon(Icons.camera_alt),
      ),
    );
  }
}