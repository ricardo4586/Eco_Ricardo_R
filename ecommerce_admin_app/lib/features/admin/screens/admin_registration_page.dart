import 'package:flutter/material.dart';
// Asegúrate de que estos archivos de dependencia existan en sus rutas
import 'package:ecommerce_admin_app/core/models/product.dart'; 
import 'package:ecommerce_admin_app/core/services/api_service.dart';
import 'package:ecommerce_admin_app/features/auth/screens/login_page.dart';
import 'package:ecommerce_admin_app/features/product_scan/screens/scanner_view.dart'; // Reutilizamos el scanner

// Esta pantalla es solo accesible si el rol es Admin
class AdminRegistrationPage extends StatefulWidget {
  const AdminRegistrationPage({super.key});

  @override
  State<AdminRegistrationPage> createState() => _AdminRegistrationPageState();
}

class _AdminRegistrationPageState extends State<AdminRegistrationPage> {
  String? _scannedBarcode;
  Product? _existingProduct;
  bool _isSearching = false;

  // Controladores y estado para el formulario de registro 
  final _nameController = TextEditingController();
  final _priceController = TextEditingController();
  final _stockController = TextEditingController();
  bool _isRegistering = false;
  final _formKey = GlobalKey<FormState>();


  Future<void> _scanBarcode() async {
    // Navega a la vista del escáner y espera el resultado del código de barras
    final barcode = await Navigator.of(context).push(
      MaterialPageRoute(builder: (context) => const ScannerView()),
    );

    if (barcode != null && barcode is String) {
      _scannedBarcode = barcode;
      _checkProductExistence(barcode);
    }
  }

  Future<void> _checkProductExistence(String barcode) async {
    setState(() {
      _isSearching = true;
      _existingProduct = null; // Reinicia el producto existente
    });

    // Llama al servicio de API para verificar si el producto ya existe
    final product = await apiService.checkProductByBarcode(barcode);

    setState(() {
      _isSearching = false;
      _existingProduct = product;
    });

    if (product == null) {
      // Producto no existe: Limpia los controladores para el nuevo registro
      _nameController.clear();
      _priceController.clear();
      _stockController.clear();
    }
  }

  Future<void> _registerNewProduct() async {
    // Valida el formulario antes de enviar
    if (_scannedBarcode == null || !_formKey.currentState!.validate()) {
      return;
    }

    setState(() { _isRegistering = true; });

    // Crea el nuevo objeto Product a partir de los campos del formulario
    final newProduct = Product(
      barcode: _scannedBarcode!,
      name: _nameController.text,
      price: double.tryParse(_priceController.text) ?? 0.0,
      stock: int.tryParse(_stockController.text) ?? 0,
    );
    
    // --- MANEJO DE ERRORES DE LA API ---
    try {
      // Llama al servicio de API para registrar el producto
      final registeredProduct = await apiService.registerProduct(newProduct);
      
      if (mounted) {
        // Registro exitoso
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('✅ Producto ${registeredProduct.name} registrado con éxito en el servidor!'), 
            backgroundColor: Colors.green
          ),
        );
        setState(() {
          _scannedBarcode = null; // Reinicia el flujo
          _existingProduct = registeredProduct; // Muestra el producto recién registrado
        });
        
      }
    } catch (e) {
      // Capturamos cualquier excepción lanzada por ApiService (ej. error 400, 409 o rol)
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('❌ Error de registro: ${e.toString().replaceFirst('Exception: ', '')}'), 
            backgroundColor: Colors.red
          ),
        );
      }
    } finally {
      // Ejecutado siempre, asegurando que el estado de carga se desactive
      if (mounted) {
        setState(() { _isRegistering = false; });
      }
    }
  }
  
  // --- WIDGET PARA MOSTRAR EL FORMULARIO DE REGISTRO ---
  Widget _buildRegistrationForm() {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Divider(),
          const Text('⚠️ Producto no encontrado.', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
          const Text('Por favor, ingrese los detalles para registrarlo:'),
          const SizedBox(height: 20),
          TextFormField(
            initialValue: _scannedBarcode,
            readOnly: true, // El código de barras escaneado no debe ser editable
            decoration: const InputDecoration(
                labelText: 'Código de Barras (Escaneado)', 
                border: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(10)))
            ),
          ),
          const SizedBox(height: 10),
          TextFormField(
            controller: _nameController,
            decoration: const InputDecoration(
                labelText: 'Nombre del Producto', 
                border: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(10)))
            ),
            validator: (value) => value!.isEmpty ? 'Ingrese un nombre' : null,
          ),
          const SizedBox(height: 10),
          TextFormField(
            controller: _priceController,
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(
                labelText: 'Precio', 
                border: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(10)))
            ),
            validator: (value) => double.tryParse(value!) == null ? 'Ingrese un precio válido' : null,
          ),
          const SizedBox(height: 10),
          TextFormField(
            controller: _stockController,
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(
                labelText: 'Stock Inicial', 
                border: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(10)))
            ),
            validator: (value) => int.tryParse(value!) == null ? 'Ingrese un stock válido' : null,
          ),
          const SizedBox(height: 30),
          ElevatedButton.icon(
            onPressed: _isRegistering ? null : _registerNewProduct,
            icon: _isRegistering 
                ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) 
                : const Icon(Icons.cloud_upload),
            label: Text(_isRegistering ? 'Registrando en Servidor...' : 'Registrar y Guardar en Servidor'),
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.blueGrey.shade700,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.all(15),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              textStyle: const TextStyle(fontSize: 16),
            ),
          ),
        ],
      ),
    );
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin: Registro de Productos'),
        backgroundColor: Colors.deepPurple,
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
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            ElevatedButton.icon(
              onPressed: _isSearching ? null : _scanBarcode,
              icon: const Icon(Icons.qr_code_scanner),
              label: const Text('Escanear Código de Barras'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.deepPurple,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.all(20),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                textStyle: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 30),

            if (_isSearching)
              const Center(child: Column(
                children: [
                  CircularProgressIndicator(),
                  SizedBox(height: 10),
                  Text('Buscando producto en el servidor...'),
                ],
              )),
              
            // Lógica: Si ya se escaneó un código y terminó la búsqueda...
            if (_scannedBarcode != null && !_isSearching) 
              ...(_existingProduct != null
                ? [ // Bloque para Producto Encontrado
                    const Text('Resultado del Escaneo:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 10),
                    Card(
                      color: Colors.green.shade50,
                      elevation: 4,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              '¡PRODUCTO ENCONTRADO!', 
                              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.green)
                            ),
                            const Divider(height: 20),
                            Text('Código: ${_existingProduct!.barcode}', style: const TextStyle(fontWeight: FontWeight.bold)),
                            Text('Nombre: ${_existingProduct!.name}'),
                            Text('Precio: \$${_existingProduct!.price.toStringAsFixed(2)}'),
                            Text('Stock: ${_existingProduct!.stock} unidades'),
                            const SizedBox(height: 10),
                            const Text(
                              'Este producto ya está en la base de datos.',
                              style: TextStyle(fontStyle: FontStyle.italic, color: Colors.black54),
                            )
                          ],
                        ),
                      ),
                    ),
                  ]
                : [ // Bloque para Producto NO Encontrado (Muestra Formulario)
                    _buildRegistrationForm(),
                  ]),
          ],
        ),
      ),
    );
  }
}