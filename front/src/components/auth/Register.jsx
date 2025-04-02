import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const db = getFirestore();

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            setLoading(true);
            setError('');

            // Crea el usuario en Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                name: formData.name,
                email: formData.email,
                roles: ['user'],
            });

            console.log('User created and role assigned:', user);
            navigate('/login');
        } catch (error) {
            console.error('Error creating user or assigning role:', error);
            setError('Error al registrar el usuario: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl transform transition duration-500 hover:scale-[1.01]">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-[#2f3374] tracking-tight">Crear Cuenta</h2>
                    <p className="mt-3 text-center text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to="/login" className="font-medium text-[#2f3374] hover:text-[#3b3e8a] transition-colors duration-300 underline">
                            Inicia sesión
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

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md -space-y-px">
                        <div className="mb-5">
                            <label htmlFor="name" className="block text-sm font-medium text-[#2f3374] mb-2">
                                Nombre
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe600] focus:border-[#ffe600] focus:z-10 sm:text-sm transition-all duration-300"
                                placeholder="Nombre completo"
                            />
                        </div>
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
                                value={formData.email}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe600] focus:border-[#ffe600] focus:z-10 sm:text-sm transition-all duration-300"
                                placeholder="Correo electrónico"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block text-sm font-medium text-[#2f3374] mb-2">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe600] focus:border-[#ffe600] focus:z-10 sm:text-sm transition-all duration-300"
                                placeholder="Contraseña"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2f3374] mb-2">
                                Confirmar Contraseña
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe600] focus:border-[#ffe600] focus:z-10 sm:text-sm transition-all duration-300"
                                placeholder="Confirma tu contraseña"
                            />
                        </div>
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
                                        <path d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" />
                                    </svg>
                                </span>
                            )}
                            <span className="pl-4 font-bold">{loading ? 'Registrando...' : 'Registrarse'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;