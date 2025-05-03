/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/Firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const creatUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const OUT = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const email = currentUser?.email || user?.email;
      const loggedUser = { email: email };
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        axios.post(
          "https://hotel-managment-server-ten.vercel.app/jwt",
          loggedUser,
          {
            withCredentials: true,
          }
        );
      } else {
        axios.post(
          "https://hotel-managment-server-ten.vercel.app/logout",
          loggedUser,
          {
            withCredentials: true,
          }
        );
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user?.email, auth]);

  const Google = () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const update = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const In = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const AuthInfo = { loading, user, In, update, Google, OUT, creatUser };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
