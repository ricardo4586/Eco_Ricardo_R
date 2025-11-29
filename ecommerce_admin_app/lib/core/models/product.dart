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
    // === CORRECCIÓN CLAVE: Mapeamos las claves en español del servidor ===
    
    // El nombre lo buscamos bajo la clave 'nombre' del servidor
    final nameValue = json['nombre'] as String? ?? json['name'] as String? ?? 'Producto Desconocido';
    
    // El precio lo buscamos bajo la clave 'precio' del servidor y aseguramos la conversión a double
    final priceValue = (json['precio'] as num?)?.toDouble() ?? (json['price'] as num?)?.toDouble() ?? 0.0;
    
    // El stock lo buscamos bajo la clave 'stock' del servidor y aseguramos la conversión a int
    final stockValue = (json['stock'] as num?)?.toInt() ?? 0;
    
    return Product(
      barcode: json['barcode'] as String? ?? 'N/A',
      name: nameValue,
      price: priceValue,
      stock: stockValue,
    );
  }
}