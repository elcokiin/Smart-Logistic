import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    return signOut(auth);
  }

  async function getUserRoles(userId) {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        return userDoc.data().roles || ['user'];
      }
      return ['user']; 
    } catch (error) {
      console.error("Error getting user roles:", error);
      return ['user'];
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const roles = await getUserRoles(user.uid);
        setUserRoles(roles);
        
        // (superadmin > admin > user)
        if (roles.includes('superadmin')) {
          setUserRole('superadmin');
        } else if (roles.includes('admin')) {
          setUserRole('admin');
        } else {
          setUserRole('user');
        }
      } else {
        setUserRoles([]);
        setUserRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    userRoles,
    login,
    logout,
    isAdmin: userRole === 'admin' || userRole === 'superadmin',
    isSuperAdmin: userRole === 'superadmin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};