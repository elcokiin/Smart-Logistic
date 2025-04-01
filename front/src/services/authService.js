import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';


export const registerUser = async (email, password, role = 'user') => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", userCredential.user.uid), {
    email,
    role,
    createdAt: new Date()
  });
  return userCredential.user;
};

export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const getUserRole = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
    return null;
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
};

export const logoutUser = () => {
  return signOut(auth);
};