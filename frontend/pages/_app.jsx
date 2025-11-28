// pages/_app.jsx
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Layout/Navbar';
import '../styles/globals.css'; 

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
      </div>
    </AuthProvider>
  );
}