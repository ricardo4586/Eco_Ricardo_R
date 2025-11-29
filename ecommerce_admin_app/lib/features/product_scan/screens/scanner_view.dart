import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

class ScannerView extends StatelessWidget {
  const ScannerView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Escanear Código de Barras'),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
      ),
      // Usamos Stack para colocar la vista de la cámara y el marco (overlay)
      body: Stack( 
        children: [
          // 1. MobileScanner (Ocupa todo el espacio)
          MobileScanner(
            controller: MobileScannerController(
              detectionTimeoutMs: 1000,
              detectionSpeed: DetectionSpeed.normal,
            ),
            onDetect: (capture) {
              final List<Barcode> barcodes = capture.barcodes;
              if (barcodes.isNotEmpty) {
                final String? barcode = barcodes.first.rawValue;
                if (barcode != null) {
                  // Devuelve el código de barras a la pantalla anterior
                  Navigator.pop(context, barcode);
                }
              }
            },
          ),
          
          // 2. Overlay o Marco (Colocado encima de la cámara)
          Center(
            child: Container(
              width: 280, // Ancho de la caja de enfoque
              height: 180, // Alto de la caja de enfoque
              decoration: BoxDecoration(
                border: Border.all(color: Colors.red, width: 4),
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Center(
                child: Padding(
                  padding: EdgeInsets.all(8.0),
                  child: Text(
                    'Apunta al código de barras o QR',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Colors.white, 
                      fontSize: 16, 
                      fontWeight: FontWeight.bold, 
                      backgroundColor: Color.fromRGBO(0, 0, 0, 0.6)
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}