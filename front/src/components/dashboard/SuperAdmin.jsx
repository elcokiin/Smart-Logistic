import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const db = getFirestore();

const SuperAdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    // Obtener usuarios desde Firestore
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const usersList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    roles: doc.data().roles || ['user']  // Aseguramos que roles siempre exista
                }));
                setUsers(usersList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, role, isChecked) => {
        try {
            const userRef = doc(db, "users", userId);
            const user = users.find((u) => u.id === userId);
            
            let updatedRoles = [...(user.roles || ['user'])];
            
            if (isChecked && !updatedRoles.includes(role)) {
                updatedRoles.push(role);
            } else if (!isChecked && updatedRoles.includes(role)) {
                updatedRoles = updatedRoles.filter(r => r !== role);
            }
            
            // Garantizar que al menos tenga el rol de user
            if (!updatedRoles.includes('user') && updatedRoles.length === 0) {
                updatedRoles.push('user');
            }

            await updateDoc(userRef, { roles: updatedRoles });

            setUsers(prevUsers =>
                prevUsers.map(u => u.id === userId ? { ...u, roles: updatedRoles } : u)
            );
            
            alert("Roles actualizados correctamente");
        } catch (error) {
            console.error("Error updating roles:", error);
            alert("Error al actualizar los roles: " + error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Panel de Super Administrador</h1>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                    Cerrar Sesión
                </button>
            </header>
            
            <div className="flex-1 max-w-6xl mx-auto w-full p-6">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Gestión de Usuarios y Roles</h2>
                    
                    {loading ? (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {user.name || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col space-y-2">
                                                    {["user", "admin", "superadmin"].map((role) => (
                                                        <label key={role} className="inline-flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={user.roles.includes(role)}
                                                                onChange={(e) => handleRoleChange(user.id, role, e.target.checked)}
                                                                disabled={currentUser.uid === user.id && role === "user"}
                                                                className="form-checkbox h-4 w-4 text-indigo-600"
                                                            />
                                                            <span className="ml-2 text-sm text-gray-600 capitalize">
                                                                {role}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;