import 'package:flutter/material.dart';
import 'package:ecommerce_admin_app/core/services/api_service.dart';
import 'package:ecommerce_admin_app/core/models/user.dart';
// Pantallas
import 'package:ecommerce_admin_app/features/admin/screens/admin_registration_page.dart';
import 'package:ecommerce_admin_app/features/pos/screens/sale_terminal_page.dart';
import 'package:ecommerce_admin_app/features/auth/screens/login_page.dart'; // Necesario para la redirección de logout

class RoleBasedRouter extends StatelessWidget {
  const RoleBasedRouter({super.key});

  @override
  Widget build(BuildContext context) {
    // Obtenemos el usuario autenticado desde el ApiService
    final user = apiService.currentUser;

    // 1. Manejo de estado no autenticado o rol desconocido
    if (user == null || user.role == UserRole.unknown) {
      // Usamos Future.microtask para asegurar que la navegación ocurre después
      // de que el widget ha sido construido, previniendo errores de estado.
      Future.microtask(() {
        apiService.logout();
        // Redirigir al LoginPage si no hay usuario válido (como medida de seguridad)
        Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (context) => const LoginPage()),
        ); 
      });
      return const Center(child: CircularProgressIndicator()); 
    }

    // 2. Lógica de ruteo basada en el rol
    if (user.role == UserRole.admin) {
      return const AdminRegistrationPage(); 
    } else if (user.role == UserRole.staff) {
      return const SaleTerminalPage(); 
    } else {
      // Manejo de cualquier otro rol futuro o inesperado
      return const Scaffold(
        body: Center(
          child: Padding(
            padding: EdgeInsets.all(32.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.lock_person, size: 60, color: Colors.deepOrange),
                SizedBox(height: 20),
                Text(
                  'Acceso Prohibido',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 10),
                Text(
                  'Tu rol no está autorizado para usar esta aplicación.',
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ),
      );
    }
  }
}