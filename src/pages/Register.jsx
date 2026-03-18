import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import registerBg from '../assets/register-bg.png';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const { success, message } = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    if (success) {
      // Registrado con éxito, mandarlo a login
      navigate('/login');
    } else {
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex text-primary">
      {/* Reutilizando el layout de la pagina derecha del login pero invirtiendo si se requiere, o igual */}
      <div className="hidden lg:flex w-1/2 bg-primary relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${registerBg})` }}
        />
        <div className="z-20 self-start mt-20 ml-10">
          <h1 className="text-surface text-5xl font-semibold leading-tight">
            Únete a<br />Inmuebles State
          </h1>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-surface p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center sm:text-left text-2xl font-bold">Registro</div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-sm p-3 bg-red-50 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="input-field"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-field"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input-field"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="input-field"
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button type="submit" className="btn-primary flex justify-center items-center">
                Crear Cuenta
              </button>
            </div>

            <div className="text-sm text-center mt-4">
              <span className="text-gray-500">¿Ya tienes cuenta?</span>{' '}
              <Link to="/login" className="font-medium text-accent hover:underline">
                Inicia sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
