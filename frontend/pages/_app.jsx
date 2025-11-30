// frontend/pages/_app.jsx
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer'; 
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer /> {/* ✅ Footer en todas las páginas */}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}