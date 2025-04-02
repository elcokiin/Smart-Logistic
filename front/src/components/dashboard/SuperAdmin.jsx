import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

const db = getFirestore();

const SuperAdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const handleRoleChange = async (userId, role, isChecked) => {
        try {
            const userRef = doc(db, "users", userId);
            const user = users.find((u) => u.id === userId);
            const updatedRoles = isChecked
                ? [...user.roles, role]
                : user.roles.filter((r) => r !== role);

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
            <div className="max-w-4xl w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border-l-4 border-(--primary-yellow)">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 bg-(--primary-yellow)/20 py-3 rounded-lg">
                        Super Admin Dashboard
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Gestiona los roles de los usuarios registrados
                    </p>
                </div>
                {loading ? (
                    <div className="flex justify-center">
                        <div className="w-12 h-12 border-4 border-(--primary-yellow) border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-(--primary-yellow)">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Nombre
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Roles
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user, index) => (
                                    <tr key={user.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex flex-col space-y-2">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={user.roles?.includes("user") || false}
                                                        onChange={(e) =>
                                                            handleRoleChange(
                                                                user.id,
                                                                "user",
                                                                e.target.checked
                                                            )
                                                        }
                                                        className="h-4 w-4 text-green-600 rounded border-gray-300"
                                                    />
                                                    <span className={`ml-2 ${user.roles?.includes("user") ? "text-green-600 font-medium" : "text-gray-600"}`}>user</span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={user.roles?.includes("admin") || false}
                                                        onChange={(e) =>
                                                            handleRoleChange(
                                                                user.id,
                                                                "admin",
                                                                e.target.checked
                                                            )
                                                        }
                                                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                                                    />
                                                    <span className={`ml-2 ${user.roles?.includes("admin") ? "text-blue-600 font-medium" : "text-gray-600"}`}>admin</span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={user.roles?.includes("superAdmin") || false}
                                                        onChange={(e) =>
                                                            handleRoleChange(
                                                                user.id,
                                                                "superAdmin",
                                                                e.target.checked
                                                            )
                                                        }
                                                        className="h-4 w-4 text-red-600 rounded border-gray-300"
                                                    />
                                                    <span className={`ml-2 ${user.roles?.includes("superAdmin") ? "text-red-600 font-medium" : "text-gray-600"}`}>superAdmin</span>
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="flex justify-center mt-4">
                    <button className="px-6 py-2 bg-(--primary-yellow) text-gray-700 font-medium rounded-md hover:bg-yellow-400 transition-colors duration-200">
                        Actualizar usuarios
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;