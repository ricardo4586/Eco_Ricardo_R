class Product {
  final String barcode;
  final String name;
  final double price;
  final int stock;
  final String category; // NUEVO CAMPO

  Product({
    required this.barcode,
    required this.name,
    required this.price,
    required this.stock,
    required this.category, // NUEVO
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      barcode: json['barcode'] ?? '',
      name: json['nombre'] ?? json['name'] ?? '',
      price: _safeToDouble(json['precio'] ?? json['price']),
      stock: _safeToInt(json['stock']),
      category: json['categoria'] ?? 'supermercado', // NUEVO
    );
  }

  // Mantener las funciones _safeToDouble y _safeToInt que ya tienes
  static double _safeToDouble(dynamic value) {
    if (value == null) return 0.0;
    try {
      if (value is double) return value;
      if (value is int) return value.toDouble();
      if (value is String) {
        final cleanString = value.replaceAll(RegExp(r'[^0-9.]'), '');
        return double.parse(cleanString);
      }
      return 0.0;
    } catch (e) {
      return 0.0;
    }
  }

  static int _safeToInt(dynamic value) {
    if (value == null) return 0;
    try {
      if (value is int) return value;
      if (value is double) return value.toInt();
      if (value is String) {
        final cleanString = value.replaceAll(RegExp(r'[^0-9]'), '');
        return int.parse(cleanString);
      }
      return 0;
    } catch (e) {
      return 0;
    }
  }

  Map<String, dynamic> toJson() {
    return {
      'barcode': barcode,
      'name': name,
      'price': price,
      'stock': stock,
      'category': category, // NUEVO
    };
  }

  @override
  String toString() {
    return 'Product(barcode: $barcode, name: $name, price: $price, stock: $stock, category: $category)';
  }
}