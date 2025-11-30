// frontend/pages/tiendas.jsx
export default function TiendasPage() {
  const tiendas = [
    { nombre: "Tienda Centro", direccion: "Av. Principal #123, Centro", telefono: "+1 (555) 123-4567", horario: "Lun-Sab: 9:00-20:00" },
    { nombre: "Tienda Norte", direccion: "Mall del Norte, Local #45", telefono: "+1 (555) 123-4568", horario: "Lun-Dom: 10:00-22:00" },
    { nombre: "Tienda Sur", direccion: "Plaza Sur, Nivel 2", telefono: "+1 (555) 123-4569", horario: "Lun-Sab: 8:00-21:00" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Nuestras Tiendas</h1>
        <div className="grid gap-6">
          {tiendas.map((tienda, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{tienda.nombre}</h3>
              <p className="text-gray-600 mb-2">📍 {tienda.direccion}</p>
              <p className="text-gray-600 mb-2">📞 {tienda.telefono}</p>
              <p className="text-gray-600">🕒 {tienda.horario}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}