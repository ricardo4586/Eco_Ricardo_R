import 'package:flutter/material.dart';
// Importamos la pantalla de login desde su nueva ubicación
import 'package:ecommerce_admin_app/features/auth/screens/login_page.dart';

void main() {
  runApp(const BarcodeScannerApp());
}

class BarcodeScannerApp extends StatelessWidget {
  const BarcodeScannerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Admin E-commerce Scanner',
      // Eliminamos el banner de "debug" en la esquina
      debugShowCheckedModeBanner: false, 
      theme: ThemeData(
        // Tema principal de la aplicación
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
        // Configuración de la fuente global
        fontFamily: 'Roboto',
      ),
      // La aplicación comienza en la pantalla de Login
      home: const LoginPage(),
    );
  }
}