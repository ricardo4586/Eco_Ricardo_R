import 'package:flutter/material.dart';
import 'package:ecommerce_admin_app/core/services/api_service.dart';
// Importamos el nuevo router basado en roles
import 'package:ecommerce_admin_app/features/auth/screens/role_based_router.dart'; 


class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  // Usamos credenciales de Admin para facilitar la prueba inicial
  final _usernameController = TextEditingController(text: 'admin@ecommerce.com'); 
  final _passwordController = TextEditingController(text: 'password123'); 
  bool _isLoading = false;
  String? _errorMessage;

  Future<void> _attemptLogin() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final success = await apiService.login(_usernameController.text, _passwordController.text);
      if (success) {
        if (mounted) {
          // --- NAVEGACIÓN CORREGIDA ---
          // Navegar al RoleBasedRouter para que decida la pantalla (Admin o Staff)
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (context) => const RoleBasedRouter()),
          );
        }
      } else {
        setState(() {
          _errorMessage = 'Credenciales inválidas.';
        });
      }
    } catch (e) {
      setState(() {
        _errorMessage = e.toString().replaceFirst('Exception: ', '');
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin Login E-commerce'),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(32.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Icon(Icons.lock_open_rounded, size: 80, color: Colors.deepPurple),
              const SizedBox(height: 30),
              TextField(
                controller: _usernameController,
                decoration: const InputDecoration(
                  labelText: 'Email (admin@ecommerce.com / staff@ecommerce.com)', // Información adicional para la prueba
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.person),
                ),
              ),
              const SizedBox(height: 20),
              TextField(
                controller: _passwordController,
                obscureText: true,
                decoration: const InputDecoration(
                  labelText: 'Contraseña (password123 / password456)',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.key),
                ),
              ),
              const SizedBox(height: 30),
              if (_errorMessage != null)
                Padding(
                  padding: const EdgeInsets.only(bottom: 15),
                  child: Text(
                    _errorMessage!,
                    style: const TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
                    textAlign: TextAlign.center,
                  ),
                ),
              ElevatedButton(
                onPressed: _isLoading ? null : _attemptLogin,
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 15),
                  backgroundColor: Colors.deepPurple,
                  foregroundColor: Colors.white,
                ),
                child: _isLoading
                    ? const SizedBox(
                        width: 24,
                        height: 24,
                        child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                      )
                    : const Text('Ingresar', style: TextStyle(fontSize: 18)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}