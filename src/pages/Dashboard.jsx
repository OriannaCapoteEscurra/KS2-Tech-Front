import { Plus, Search, Filter, User } from 'lucide-react';
import EstateCard from '../components/EstateCard';
import EstateForm from '../components/EstateForm';
import Loader from '../components/Loader';
import ConfirmModal from '../components/ConfirmModal';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { useEffect, useState } from 'react';
import UserTable from '../components/UserTable';

// Mock data based on the design
const mockEstates = [
  {
    id: 1,
    title: 'Cratey Plavis',
    location: 'Rom Brree',
    status: 'AVAILABLE',
    price: '$450,000',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80',
  },
  {
    id: 2,
    title: 'Ponsy Baugs',
    location: 'Rom Brres',
    status: 'AVAILABLE',
    price: '$320,000',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80',
  },
  {
    id: 3,
    title: 'Tovsy Promign',
    location: 'Rom Bqros',
    status: 'SOLD',
    price: '$750,000',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80',
  },
  {
    id: 4,
    title: 'Srestin Plartoy',
    location: 'Rom Bgres',
    status: 'SOLD',
    price: '$285,000',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80',
  }
];

export default function Dashboard() {
  const [filter, setFilter] = useState('TODO');
  const [estates, setEstates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEstate, setEditingEstate] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const { addToast } = useToast();

  const handleSave = async (formData) => {
    try {
      if (editingEstate) {
        await api.put(`/houses/${editingEstate.id}`, formData);
        setEstates(estates.map(e => e.id === editingEstate.id ? { ...e, ...formData } : e));
        addToast('Venta de inmueble actualizada exitosamente');
      } else {
        const res = await api.post('/houses', formData);
        const newHouse = res.data?.data || res.data || { id: Date.now(), ...formData };
        setEstates([...estates, newHouse]);
        addToast('Venta de inmueble creada exitosamente');
      }
      setIsFormOpen(false);
      setEditingEstate(null);
    } catch (err) {
      console.error(err);
      addToast('Error al guardar el inmueble en la base de datos', 'error');
    }
  };

  const handleDeleteRequest = (id) => {
    setConfirmDeleteId(id);
  };

  const executeDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await api.delete(`/houses/${confirmDeleteId}`);
      setEstates(estates.filter(e => e.id !== confirmDeleteId));
      addToast('Inmueble eliminado con éxito');
    } catch (err) {
      console.error(err);
      addToast('No se pudo eliminar el inmueble', 'error');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  useEffect(() => {
    const fetchEstates = async () => {
      try {
        setLoading(true);
        const response = await api.get('/houses');

        const data = response.data || []

        setEstates(data.length > 0 ? data : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching houses:', err);
        setError('No se pudo conectar con la API (/houses). Mostrando datos de prueba.');
        setEstates(mockEstates);
      } finally {
        setLoading(false);
      }
    };

    fetchEstates();
  }, []);

  const filteredEstates = estates.filter(estate =>
    filter === 'TODO' ? true : estate.status.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Header section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Inmuebles</h1>
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center space-x-2 bg-surface border border-gray-200 px-4 py-2 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 transition-colors"
            onClick={() => { setEditingEstate(null); setIsFormOpen(true); }}
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Inmueble</span>
          </button>

          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-surface shadow-sm flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex items-center space-x-4 bg-surface p-3 rounded-lg shadow-sm border border-gray-100">
        <button
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'TODO' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}
          onClick={() => setFilter('TODO')}
        >
          Todos
        </button>
        <button
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'DISPONIBLE' ? 'bg-accent text-white' : 'text-gray-500 hover:bg-gray-100'}`}
          onClick={() => setFilter('DISPONIBLE')}
        >
          Disponible
        </button>
        <button
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'VENDIDO' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
          onClick={() => setFilter('VENDIDO')}
        >
          Vendido
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg border border-red-100 text-sm font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-12 bg-surface rounded-xl border border-gray-100">
          <Loader text="Consultando inmuebles API..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEstates.length > 0 ? (
            filteredEstates.map((estate) => (
              <EstateCard
                key={estate.id || estate._id || Math.random()}
                estate={estate}
                onEdit={(est) => { setEditingEstate(est); setIsFormOpen(true); }}
                onDelete={handleDeleteRequest}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500 bg-surface rounded-xl border border-gray-100">
              No se encontraron inmuebles.
            </div>
          )}
        </div>
      )}

      {/* Spacer */}
      <div className="py-4"></div>

      {isFormOpen && (
        <EstateForm
          initialData={editingEstate}
          onSubmit={handleSave}
          onCancel={() => { setIsFormOpen(false); setEditingEstate(null); }}
        />
      )}

      <ConfirmModal
        isOpen={!!confirmDeleteId}
        title="Eliminar Inmueble"
        message="¿Estás seguro de que deseas eliminar este inmueble? Esta acción no se puede deshacer."
        onConfirm={executeDelete}
        onCancel={() => setConfirmDeleteId(null)}
      />

      {/* User Management Section */}
      {/* <div className="bg-surface rounded-xl shadow-sm border border-gray-100 p-6">
        <UserTable />
      </div> */}

    </div>
  );
}
