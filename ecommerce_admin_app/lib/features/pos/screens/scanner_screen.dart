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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Escanear Producto')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _barcodeController,
              decoration: const InputDecoration(
                labelText: 'Código de Barras',
                border: OutlineInputBorder(),
              ),
              onSubmitted: (_) => _searchProduct(),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _isLoading ? null : _searchProduct,
              child: _isLoading 
                  ? const CircularProgressIndicator()
                  : const Text('Buscar Producto'),
            ),
            const SizedBox(height: 20),
            if (_product != null) ...[
              Card(
                child: ListTile(
                  title: Text(_product!.name),
                  subtitle: Text('Precio: \$${_product!.price} - Stock: ${_product!.stock}'),
                  trailing: Text(_product!.barcode),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}