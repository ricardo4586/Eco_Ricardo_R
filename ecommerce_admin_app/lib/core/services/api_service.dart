import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http; // Importación de la librería HTTP

// Importamos los modelos
import 'package:ecommerce_admin_app/core/models/product.dart';
import 'package:ecommerce_admin_app/core/models/user.dart'; // Importado para manejar roles (Admin/Staff)

// Clase para manejar todas las peticiones a la API
class ApiService {
  // *** MUY IMPORTANTE: CONFIGURACIÓN DE LA URL BASE ***
  // IP REAL detectada: 192.168.1.35. 
  // ¡Asegúrate de que el servidor Express.js esté corriendo y que el puerto 3000 esté abierto en tu Firewall!
  final String baseUrl = 'http://192.168.1.35:3000/api'; 
  
  String? _authToken; 
  User? _currentUser; // Almacena el usuario actual y su rol
  
  // Singleton para asegurar una única instancia del servicio
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal();

  String? get currentAuthToken => _authToken;
  User? get currentUser => _currentUser; // Getter para acceder al rol
  
  // Encabezados comunes para peticiones que requieren JSON y Autenticación (Bearer Token)
  Map<String, String> get _authHeaders => {
    'Content-Type': 'application/json',
    'Authorization': _authToken != null ? 'Bearer $_authToken' : '',
  };

  // -------------------------------------------------------------------
  // 1. LOGIN
  // -------------------------------------------------------------------

  Future<bool> login(String email, String password) async {
    final url = Uri.parse('$baseUrl/login');
    
    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'email': email, 'password': password}),
      ).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data['success'] == true) {
          _authToken = data['token']; // Guardamos el user.id como token
          
          // Parsear el objeto User con el rol (el servidor Express devuelve 'rol')
          _currentUser = User.fromJson(data); 
          
          return true;
        }
      }
      // Si el login falla (401), se devuelve false
      return false;
      
    } on TimeoutException {
      throw Exception('Tiempo de espera agotado. El servidor no respondió.');
    } catch (e) {
      print('Error en el login: $e');
      throw Exception('Error de red o conexión al servidor.');
    }
  }

  void logout() {
    _authToken = null;
    _currentUser = null; // Limpia el usuario al cerrar sesión
  }
  
  // -------------------------------------------------------------------
  // 2. VERIFICAR PRODUCTO POR CÓDIGO DE BARRAS
  // -------------------------------------------------------------------

  Future<Product?> checkProductByBarcode(String barcode) async {
    if (_authToken == null) throw Exception("Error: No autenticado.");
    
    final url = Uri.parse('$baseUrl/productos/buscar/$barcode');
    
    try {
      final response = await http.get(url, headers: _authHeaders)
          .timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data['success'] == true && data['data'] != null) {
          // Mapear la respuesta del servidor (usa claves en español)
          return Product.fromJson(data['data']);
        }
      } else if (response.statusCode == 404) {
        // Producto no encontrado
        return null;
      }
      
      print('Error al buscar producto. Código: ${response.statusCode}');
      return null;
      
    } on TimeoutException {
      throw Exception('Tiempo de espera agotado al buscar producto.');
    } catch (e) {
      print('Error al buscar producto: $e');
      return null;
    }
  }

  // -------------------------------------------------------------------
  // 3. REGISTRAR NUEVO PRODUCTO (SOLO ADMIN)
  // -------------------------------------------------------------------

  Future<Product> registerProduct(Product product) async {
    if (_authToken == null) throw Exception("Error: No autenticado.");
    
    // Verificación de rol para la ruta de registro
    if (_currentUser?.role != UserRole.admin) {
        throw Exception("Acceso denegado. Solo administradores pueden registrar productos.");
    }
    
    final url = Uri.parse('$baseUrl/productos/registrar');
    
    try {
      // Mapeo de claves en español para el servidor
      final productData = {
        'barcode': product.barcode,
        'id_numerico': product.barcode, 
        'nombre': product.name,         
        'precio': product.price,
        'stock': product.stock,
      };
      
      // --- LOG DE DEBUG PARA REGISTRO ---
      print('API POST: Enviando producto a $url con token: $_authToken');
      print('API POST Data: ${json.encode(productData)}');
      
      final response = await http.post(
        url,
        headers: _authHeaders,
        body: json.encode(productData),
      ).timeout(const Duration(seconds: 10));

      print('API POST Response Code Final: ${response.statusCode}');
      // --- FIN LOG DE DEBUG ---

      if (response.statusCode == 201) { // 201 Created es éxito
        final data = json.decode(response.body);
        
        // Devolvemos el producto recién creado
        if (data['success'] == true && data['producto'] != null) {
             return Product.fromJson(data['producto']);
        }
         throw Exception('Registro exitoso, pero el servidor no devolvió los datos del producto.');
      } else {
        // Capturamos el error 400 (Faltan campos) o 409 (Ya existe)
        final errorData = json.decode(response.body);
        print('Error de registro: ${response.statusCode}. Mensaje: ${errorData['message']}');
        throw Exception(errorData['message'] ?? 'Error desconocido al registrar el producto.');
      }
      
    } on TimeoutException {
      throw Exception('Tiempo de espera agotado al registrar producto.');
    } catch (e) {
      print('Error al registrar producto: $e');
      rethrow;
    }
  }
}

final apiService = ApiService(); // Instancia única para usar en toda la app