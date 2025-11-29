// core/services/api_service.dart
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

// Importamos los modelos
import 'package:ecommerce_admin_app/core/models/product.dart';
import 'package:ecommerce_admin_app/core/models/user.dart';

class ApiService {
  // *** CONFIGURACIÓN DE LA URL BASE ***
  final String baseUrl = 'http://192.168.1.35:3000/api'; 
  
  String? _authToken; 
  User? _currentUser;
  
  // Singleton para asegurar una única instancia del servicio
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal();

  // Getters para acceder al estado de autenticación
  String? get currentAuthToken => _authToken;
  User? get currentUser => _currentUser;
  bool get isAdmin => _currentUser?.role == UserRole.admin;
  bool get isStaff => _currentUser?.role == UserRole.staff;
  bool get isAuthenticated => _authToken != null;

  // Encabezados comunes para peticiones autenticadas
  Map<String, String> get _authHeaders => {
    'Content-Type': 'application/json',
    'Authorization': _authToken != null ? 'Bearer $_authToken' : '',
  };

  // -------------------------------------------------------------------
  // 1. AUTENTICACIÓN - LOGIN
  // -------------------------------------------------------------------

  Future<bool> login(String email, String password) async {
    final url = Uri.parse('$baseUrl/login');
    
    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'email': email, 'password': password}),
      ).timeout(const Duration(seconds: 10));

      print('Login Response: ${response.statusCode}');
      
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data['success'] == true) {
          _authToken = data['token'];
          
          // Crear usuario con información del backend
          _currentUser = User(
            id: int.parse(data['token']), // El token es el ID del usuario
            email: email,
            role: _parseUserRole(data['rol']), // Convertir string a UserRole
          );
          
          print('Login exitoso. Rol: ${_currentUser!.role}');
          return true;
        }
      }
      
      // Si el login falla
      print('Login fallido: ${response.body}');
      return false;
      
    } on TimeoutException {
      print('Timeout en login');
      throw Exception('Tiempo de espera agotado. El servidor no respondió.');
    } catch (e) {
      print('Error en el login: $e');
      throw Exception('Error de red o conexión al servidor.');
    }
  }

  // Función helper para convertir string a UserRole
  UserRole _parseUserRole(String roleString) {
    switch (roleString.toLowerCase()) {
      case 'admin':
        return UserRole.admin;
      case 'staff':
        return UserRole.staff;
      default:
        return UserRole.staff; // Por defecto
    }
  }

  // Cerrar sesión
  void logout() {
    _authToken = null;
    _currentUser = null;
    print('Sesión cerrada');
  }

  // -------------------------------------------------------------------
  // 2. OPERACIONES CON PRODUCTOS
  // -------------------------------------------------------------------

  // Buscar producto por código de barras
  Future<Product?> checkProductByBarcode(String barcode) async {
    if (_authToken == null) {
      throw Exception("Error: No autenticado. Inicia sesión primero.");
    }
    
    final url = Uri.parse('$baseUrl/productos/buscar/$barcode');
    
    try {
      print('Buscando producto: $barcode');
      final response = await http.get(url, headers: _authHeaders)
          .timeout(const Duration(seconds: 10));

      print('Respuesta búsqueda: ${response.statusCode}');
      
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data['success'] == true && data['data'] != null) {
          print('Producto encontrado: ${data['data']}');
          return Product.fromJson(data['data']);
        }
      } else if (response.statusCode == 404) {
        print('Producto no encontrado: $barcode');
        return null;
      } else {
        print('Error HTTP en búsqueda: ${response.statusCode} - ${response.body}');
        throw Exception('Error del servidor al buscar producto');
      }
      
      return null;
      
    } on TimeoutException {
      throw Exception('Tiempo de espera agotado al buscar producto.');
    } catch (e) {
      print('Error al buscar producto: $e');
      rethrow;
    }
  }

  // Registrar nuevo producto (SOLO ADMIN)
  Future<Product> registerProduct(Product product) async {
    if (_authToken == null) {
      throw Exception("Error: No autenticado. Inicia sesión primero.");
    }
    
    // Verificación de rol para la ruta de registro
    if (!isAdmin) {
      throw Exception("Acceso denegado. Solo administradores pueden registrar productos.");
    }
    
    final url = Uri.parse('$baseUrl/productos/registrar');
    
    try {
      // Preparar datos para el servidor (claves en español)
      final productData = {
        'barcode': product.barcode,
        'id_numerico': product.barcode, // Usamos el barcode como id_numerico
        'nombre': product.name,         
        'precio': product.price,
        'stock': product.stock,
      };
      
      // Logs de depuración
      print('🔐 Registrando producto como ADMIN');
      print('📤 URL: $url');
      print('📦 Datos: ${json.encode(productData)}');
      
      final response = await http.post(
        url,
        headers: _authHeaders,
        body: json.encode(productData),
      ).timeout(const Duration(seconds: 10));

      print('📥 Respuesta: ${response.statusCode}');
      print('📄 Body: ${response.body}');

      if (response.statusCode == 201) {
        final data = json.decode(response.body);
        
        if (data['success'] == true && data['producto'] != null) {
          print('✅ Producto registrado exitosamente');
          return Product.fromJson(data['producto']);
        }
        throw Exception('Registro exitoso, pero el servidor no devolvió los datos del producto.');
      } else {
        // Manejar errores específicos
        final errorData = json.decode(response.body);
        final errorMessage = errorData['message'] ?? 'Error desconocido al registrar el producto.';
        
        print('❌ Error de registro: ${response.statusCode} - $errorMessage');
        
        if (response.statusCode == 409) {
          throw Exception('El producto con código ${product.barcode} ya existe.');
        } else if (response.statusCode == 400) {
          throw Exception('Datos inválidos: $errorMessage');
        } else {
          throw Exception(errorMessage);
        }
      }
      
    } on TimeoutException {
      throw Exception('Tiempo de espera agotado al registrar producto.');
    } catch (e) {
      print('💥 Error en registerProduct: $e');
      rethrow;
    }
  }

  // Obtener catálogo completo de productos (PÚBLICO)
  Future<List<Product>> getProductCatalog() async {
    final url = Uri.parse('$baseUrl/productos');
    
    try {
      print('Obteniendo catálogo de productos...');
      final response = await http.get(url).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data['success'] == true && data['data'] != null) {
          List<dynamic> productsJson = data['data'];
          final products = productsJson.map((json) => Product.fromJson(json)).toList();
          print('✅ Catálogo obtenido: ${products.length} productos');
          return products;
        }
      }
      
      throw Exception('Error al cargar el catálogo de productos');
      
    } on TimeoutException {
      throw Exception('Tiempo de espera agotado al cargar el catálogo.');
    } catch (e) {
      print('Error al cargar catálogo: $e');
      throw Exception('Error de red al cargar el catálogo.');
    }
  }

  // -------------------------------------------------------------------
  // 3. VALIDACIONES Y UTILIDADES
  // -------------------------------------------------------------------

  // Validar formato EAN-13
  bool isValidEAN13(String barcode) {
    if (barcode.length != 13) return false;
    if (!RegExp(r'^\d+$').hasMatch(barcode)) return false;
    return true;
  }

  // Verificar conexión con el servidor
  Future<bool> checkServerConnection() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/productos')).timeout(const Duration(seconds: 5));
      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }

  // Limpiar datos de autenticación (para testing)
  void clearAuth() {
    _authToken = null;
    _currentUser = null;
  }
}

// Instancia global para usar en toda la app
final apiService = ApiService();