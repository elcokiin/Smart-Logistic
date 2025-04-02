import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  getIdToken
} from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);

  // Función para obtener y guardar el token
  const fetchAndSetToken = async (user) => {
    if (user) {
      try {
        const idToken = await user.getIdToken();
        localStorage.setItem('authToken', idToken);
        setToken(idToken);
        return idToken;
      } catch (error) {
        console.error("Error obteniendo token:", error);
        return null;
      }
    } else {
      localStorage.removeItem('authToken');
      setToken(null);
      return null;
    }
  };

  // Función para obtener los roles del usuario desde Firestore
  const getUserRoles = async (uid) => {
    try {
      setRolesLoading(true);
      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setRolesLoading(false);
        return userData.roles || [];
      }
      setRolesLoading(false);
      return [];
    } catch (error) {
      console.error("Error al obtener roles:", error);
      setRolesLoading(false);
      return [];
    }
  };

  // Función para verificar si el usuario tiene un rol específico
  const hasRole = (role) => {
    return userRoles.includes(role);
  };

  async function login(email, password) {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      // Obtener token inmediatamente después del login
      await fetchAndSetToken(result.user);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      // Limpiar token al cerrar sesión
      localStorage.removeItem('authToken');
      setToken(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      throw error;
    }
  }

  // Función para actualizar el token (útil para renovarlo)
  const refreshToken = async () => {
    if (currentUser) {
      return await fetchAndSetToken(currentUser);
    }
    return null;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        // Obtener token
        await fetchAndSetToken(user);

        // Obtener roles
        setRolesLoading(true);
        const roles = await getUserRoles(user.uid);
        setUserRoles(roles);
        setRolesLoading(false);
      } else {
        setCurrentUser(null);
        setUserRoles([]);
        localStorage.removeItem('authToken');
        setToken(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Configurar renovación de token cada hora
  useEffect(() => {
    if (!currentUser) return;

    const tokenRefreshInterval = setInterval(() => {
      refreshToken();
    }, 55 * 60 * 1000); // Renovar 5 minutos antes de que expire (tokens duran 1 hora)

    return () => clearInterval(tokenRefreshInterval);
  }, [currentUser]);

  const value = {
    currentUser,
    userRoles,
    token,        // Exponemos el token
    hasRole,
    login,
    logout,
    refreshToken, // Exponemos la función para actualizar el token
    loading: loading || rolesLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};