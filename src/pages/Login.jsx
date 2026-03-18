import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import loginBg from '../assets/login-bg.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Minimal local validation
    if (!email || !password) {
      setError('Por favor llena todos los campos');
      return;
    }

    const { success, message } = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex text-primary">
      {/* Puesto de diseño: panel izquierdo (imagen y tipografía) */}
      <div className="hidden lg:flex w-1/2 bg-primary relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* Usamos un color/gradiente por si no hay imagen de placeholder */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${loginBg})` }}
        />
        <div className="z-20 self-start">
          <h1 className="text-surface text-5xl font-semibold leading-tight">
            Inmuebles<br />State
          </h1>
        </div>
      </div>

      {/* Puesto de diseño: panel derecho (formulario) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-surface p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-sm p-3 bg-red-50 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-field"
                  placeholder="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input-field"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn-primary"
              >
                Iniciar Sesión
              </button>
            </div>

            <div className="text-sm text-center">
              <a href="#" className="font-medium text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className="text-sm text-center mt-4">
              <span className="text-gray-500">¿No tienes cuenta?</span>{' '}
              <Link to="/register" className="font-medium text-accent hover:underline">
                Regístrate
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
