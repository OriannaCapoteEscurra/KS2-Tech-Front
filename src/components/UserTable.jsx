import React, { useState, useEffect } from 'react';
import { UserPlus, Edit2, Trash2 } from 'lucide-react';
import api from '../services/api';
import Loader from './Loader';
import UserForm from './UserForm';
import ConfirmModal from './ConfirmModal';
import { useToast } from '../context/ToastContext';

const mockUsers = [
  { id: 1, name: 'Nes Poors', stat: '20m', sold: 140, total: 300 },
  { id: 2, name: 'Nee Woore', stat: '20m', sold: 250, total: 270 },
  { id: 3, name: 'Whier', stat: '30m', sold: 260, total: 200 },
  { id: 4, name: 'Fle Charre', stat: '20m', sold: 200, total: 300 },
];



export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const { addToast } = useToast();

  const handleSave = async (formData) => {
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, formData);
        setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
        addToast('Usuario actualizado exitosamente');
      } else {
        // En caso que desde el admin permitas POST /auth/register, o un POST a usuarios falso
        addToast('La creacion de usuarios debe realizarse desde /register, sin embargo simulamos.', 'success');
      }
      setIsFormOpen(false);
      setEditingUser(null);
    } catch (err) {
      console.error(err);
      addToast('Error al guardar el usuario en la BD', 'error');
    }
  };

  const handleDeleteRequest = (id) => {
    setConfirmDeleteId(id);
  };

  const executeDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await api.delete(`/users/${confirmDeleteId}`);
      setUsers(users.filter(u => u.id !== confirmDeleteId));
      addToast('Usuario eliminado exitosamente');
    } catch (err) {
      console.error(err);
      addToast('Error al eliminar usuario', 'error');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await api.get('/users');
        
        // Dependiendo del formato devuelto, obtenemos un array.
        const responseData = response.data || response;
        const data = Array.isArray(responseData) ? responseData : (responseData.users || responseData.data || []);
        
        if (data.length > 0) {
          setUsers(data);
        } else {
          setUsers([]);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('No se pudo conectar con la API (/users). Mostrando datos de prueba.');
        setUsers(mockUsers);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {isFormOpen && (
        <UserForm 
          initialData={editingUser} 
          onSubmit={handleSave} 
          onCancel={() => { setIsFormOpen(false); setEditingUser(null); }} 
        />
      )}
      <ConfirmModal
        isOpen={!!confirmDeleteId}
        title="Eliminar Usuario"
        message="¿Estás seguro de que deseas eliminar a este usuario del sistema? Esta acción es permanente."
        onConfirm={executeDelete}
        onCancel={() => setConfirmDeleteId(null)}
      />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-primary">Gestión de Usuarios</h2>
        <button 
           className="text-gray-500 hover:text-primary transition-colors"
           onClick={() => { setEditingUser(null); setIsFormOpen?.(true); }}
        >
          <UserPlus className="w-5 h-5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        {error && (
          <div className="bg-red-50 text-red-500 p-4 mb-4 rounded-lg border border-red-100 text-sm font-medium">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-8 bg-surface rounded-xl border border-gray-100 mb-4">
            <Loader text="Consultando usuarios API..." />
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100/50 text-gray-400 text-sm font-medium">
                <th className="py-3 px-4 font-normal">Usuarios</th>
                <th className="py-3 px-4 font-normal">Estado</th>
                <th className="py-3 px-4 font-normal">Vendido</th>
                <th className="py-3 px-4 font-normal">Total </th>
                <th className="py-3 px-4 font-normal text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {users.length > 0 ? (
                users.map((user, idx) => (
                  <tr key={user.id || user._id || Math.random()} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${idx % 2 === 0 ? 'bg-gray-50/30' : 'bg-transparent'}`}>
                <td className="py-3 px-4 font-medium text-primary">{user.name}</td>
                <td className="py-3 px-4 text-gray-600">{user.stat}</td>
                <td className="py-3 px-4 text-gray-600">{user.sold}</td>
                <td className="py-3 px-4 text-primary font-semibold">{user.total || '-'}</td>
                <td className="py-3 px-4 text-right flex justify-end gap-3 border-none">
                  <button onClick={() => { setEditingUser(user); setIsFormOpen(true); }} className="text-gray-400 hover:text-blue-500 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteRequest(user.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500 bg-surface rounded-xl border border-gray-100">
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}


