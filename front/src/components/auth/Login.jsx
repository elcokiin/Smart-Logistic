import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth'; // Importa el método de Firebase
import { auth } from '../../firebase/config'; // Ajusta la ruta según tu estructura de carpetas

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState(''); // Estado para el mensaje de restablecimiento
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      const loginVar = await login(email, password);

      console.log(JSON.stringify(loginVar.user.accessToken))

      localStorage.setItem('token', JSON.stringify(loginVar.user.accessToken));

      navigate('/home');
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordReset() {
    if (!email) {
      setError('Por favor, ingresa tu correo electrónico para restablecer la contraseña.');
      return;
    }

    try {
      setError('');
      setResetMessage('');
      await sendPasswordResetEmail(auth, email); // Usa la instancia de auth importada
      setResetMessage('Se ha enviado un correo para restablecer tu contraseña.');
    } catch (error) {
      setError('Error al enviar el correo de restablecimiento: ' + error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl transform transition duration-500 hover:scale-[1.01]">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#2f3374] tracking-tight">Iniciar Sesión</h2>
          <p className="mt-3 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="font-medium text-[#2f3374] hover:text-[#3b3e8a] transition-colors duration-300 underline">
              Regístrate
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm animate-pulse" role="alert">
            <div className="flex">
              <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="block sm:inline">{error}</span>
            </div>
          </div>
        )}

        {resetMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-sm" role="alert">
            <span className="block sm:inline">{resetMessage}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px">
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-[#2f3374] mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe600] focus:border-[#ffe600] focus:z-10 sm:text-sm transition-all duration-300"
                placeholder="Correo electrónico"
              />
            </div>
            <div className="mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-[#2f3374] mb-2">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe600] focus:border-[#ffe600] focus:z-10 sm:text-sm transition-all duration-300"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div className="text-sm text-right">
            <button
              type="button"
              onClick={handlePasswordReset}
              className="font-medium text-[#2f3374] hover:text-[#ffe600] transition-colors duration-300 underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-[#2f3374] bg-gradient-to-r from-[#ffe600] to-[#fbd102] hover:from-[#fbd102] hover:to-[#ffe600] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fbd102] transform transition-all duration-300 hover:scale-[1.01] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="animate-spin h-5 w-5 text-[#2f3374]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-[#2f3374]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
              <span className="pl-4 font-bold">{loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;