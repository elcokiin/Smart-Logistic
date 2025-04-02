import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

const db = getFirestore(); // Inicializa Firestore

const SuperAdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Obtener usuarios desde Firestore
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const usersList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
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

    // Actualizar roles del usuario
    const handleRoleChange = async (userId, role, isChecked) => {
        try {
            const userRef = doc(db, "users", userId);
            const user = users.find((u) => u.id === userId);
            const updatedRoles = isChecked
                ? [...user.roles, role] // Agregar rol
                : user.roles.filter((r) => r !== role); // Quitar rol

            await updateDoc(userRef, { roles: updatedRoles });

            setUsers((prevUsers) =>
                prevUsers.map((u) =>
                    u.id === userId ? { ...u, roles: updatedRoles } : u
                )
            );
            alert("Roles actualizados correctamente");
        } catch (error) {
            console.error("Error updating roles:", error);
            alert("Error al actualizar los roles");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Super Admin Dashboard
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Gestiona los roles de los usuarios registrados
                    </p>
                </div>
                {loading ? (
                    <p className="text-center text-gray-500">Cargando usuarios...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nombre
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Roles
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex flex-col space-y-2">
                                                {["user", "admin", "superAdmin"].map((role) => (
                                                    <label key={role} className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={user.roles.includes(role)}
                                                            onChange={(e) =>
                                                                handleRoleChange(
                                                                    user.id,
                                                                    role,
                                                                    e.target.checked
                                                                )
                                                            }
                                                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                        />
                                                        <span className="ml-2 text-sm text-gray-600">{role}</span>
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
    );
};

export default SuperAdminDashboard;