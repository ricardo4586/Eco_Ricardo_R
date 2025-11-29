enum UserRole {
  admin,
  staff, // Usuario Normal (Coincide con 'usuario' en el servidor Express.js)
  unknown, // Rol no reconocido o por defecto
}

class User {
  final String id;
  final UserRole role;

  User({required this.id, required this.role});

  // Constructor de fábrica para crear un objeto User a partir de la respuesta JSON del servidor
  factory User.fromJson(Map<String, dynamic> json) {
    // La clave 'rol' viene del servidor Express.js
    final roleString = json['rol'] as String? ?? 'unknown'; 
    
    // La clave 'token' viene del servidor Express.js y contiene el id del usuario
    return User(
      id: json['token'] as String,
      role: _roleFromString(roleString),
    );
  }

  // Función estática para mapear la cadena del rol del servidor al enum de Dart
  static UserRole _roleFromString(String role) {
    switch (role.toLowerCase()) {
      case 'admin':
        return UserRole.admin;
      case 'usuario': // Coincide con el rol devuelto por tu servidor Express.js
      case 'staff': // Lo incluimos como alias de 'usuario' si se necesitara
        return UserRole.staff;
      default:
        return UserRole.unknown;
    }
  }
}