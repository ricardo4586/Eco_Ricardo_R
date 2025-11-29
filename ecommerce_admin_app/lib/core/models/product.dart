class Product {
  final String barcode;
  final String name;
  final double price;
  final int stock;

  Product({
    required this.barcode,
    required this.name,
    required this.price,
    required this.stock,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      barcode: json['barcode'] ?? '',
      name: json['nombre'] ?? json['name'] ?? '',
      // CORRECCIÓN: Manejo seguro de la conversión del precio
      price: _safeToDouble(json['precio'] ?? json['price']),
      // CORRECCIÓN: Manejo seguro de la conversión del stock
      stock: _safeToInt(json['stock']),
    );
  }

  // Función helper para convertir seguro a double
  static double _safeToDouble(dynamic value) {
    if (value == null) return 0.0;
    
    try {
      if (value is double) return value;
      if (value is int) return value.toDouble();
      if (value is String) {
        // Remover cualquier caracter no numérico excepto punto decimal
        final cleanString = value.replaceAll(RegExp(r'[^0-9.]'), '');
        return double.parse(cleanString);
      }
      return 0.0;
    } catch (e) {
      print('Error convirtiendo a double: $value - $e');
      return 0.0;
    }
  }

  // Función helper para convertir seguro a int
  static int _safeToInt(dynamic value) {
    if (value == null) return 0;
    
    try {
      if (value is int) return value;
      if (value is double) return value.toInt();
      if (value is String) {
        // Remover cualquier caracter no numérico
        final cleanString = value.replaceAll(RegExp(r'[^0-9]'), '');
        return int.parse(cleanString);
      }
      return 0;
    } catch (e) {
      print('Error convirtiendo a int: $value - $e');
      return 0;
    }
  }

  Map<String, dynamic> toJson() {
    return {
      'barcode': barcode,
      'name': name,
      'price': price,
      'stock': stock,
    };
  }

  @override
  String toString() {
    return 'Product(barcode: $barcode, name: $name, price: $price, stock: $stock)';
  }
}