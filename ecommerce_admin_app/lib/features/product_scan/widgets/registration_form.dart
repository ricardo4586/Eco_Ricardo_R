class Product {
  final String barcode;
  final String name;
  final double price;
  final int stock;

  Product({
    required this.barcode, 
    required this.name, 
    required this.price, 
    required this.stock
  });

  // Método para convertir el objeto Producto a un mapa JSON (para enviar a la API)
  Map<String, dynamic> toJson() => {
    'barcode': barcode,
    'name': name,
    'price': price,
    'stock': stock,
  };

  // Método para crear un objeto Producto a partir de un mapa JSON (para recibir de la API)
  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      barcode: json['barcode'] as String,
      name: json['name'] as String? ?? 'Unknown Product',
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      stock: (json['stock'] as num?)?.toInt() ?? 0,
    );
  }
}