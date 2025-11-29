// features/auth/screens/role_based_router.dart
import 'package:flutter/material.dart';
import 'package:ecommerce_admin_app/core/services/api_service.dart';
import 'package:ecommerce_admin_app/core/models/user.dart';

// Pantallas
import 'package:ecommerce_admin_app/features/admin/screens/admin_dashboard.dart';
import 'package:ecommerce_admin_app/features/staff/screens/staff_dashboard.dart';
import 'package:ecommerce_admin_app/features/auth/screens/login_page.dart';

class RoleBasedRouter extends StatelessWidget {
  const RoleBasedRouter({super.key});

  @override
  Widget build(BuildContext context) {
    final user = apiService.currentUser;

    // 1. Si no hay usuario autenticado, ir al login
    if (user == null) {
      return const LoginPage();
    }

    // 2. Lógica de ruteo basada en el rol
    switch (user.role) {
      case UserRole.admin:
        return const AdminDashboard();
      case UserRole.staff:
        return const StaffDashboard();
      // CORRECCIÓN: Eliminamos el 'default' case ya que UserRole solo tiene admin y staff
    }

    // CORRECCIÓN: Si llegamos aquí, hay un rol no manejado
    return _buildErrorScreen(context);
  }

  Widget _buildErrorScreen(BuildContext context) {
    // Usar Future.microtask para navegar después de construir
    Future.microtask(() {
      apiService.logout();
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => const LoginPage()),
      );
    });

    return const Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.error_outline, size: 60, color: Colors.red),
            SizedBox(height: 20),
            Text(
              'Error de Rol',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 10),
            Text(
              'Rol de usuario no reconocido.\nRedirigiendo al login...',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.grey),
            ),
            SizedBox(height: 20),
            CircularProgressIndicator(),
          ],
        ),
      ),
    );
  }
}