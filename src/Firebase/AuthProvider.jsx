import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile as firebaseUpdateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxios from "../Hooks/UseAxios";
import Swal from "sweetalert2"; // Import Swal for alert

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxios();

  // Function to save user to the database
  const saveUser = async (user) => {
    const currentUser = {
      email: user?.email,
      name: user?.displayName,
      photo: user?.photoURL,
      role: "user",
      status: "Verified",
    };

    axiosSecure.post('/users', currentUser)
          .then(res => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Registered!",
                text: "You've successfully registered.",
                icon: "success"
              });
              navigate('/')
            }
          })

          .catch(error => {
            Swal.fire({
              icon: "error",
              title: "Oops !",
              text: error.message,
            });
          })
  };

  // Set up the auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        await saveUser(currentUser); // Save user if logged in
      }
    });
    return () => unsubscribe();
  }, []);

  const NewUser = (email, password, name, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        return updateProfile(cred.user, {
          displayName: name,
          photoURL: photoURL,
        });
      })
      .finally(() => setLoading(false));
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .finally(() => setLoading(false));
  };

  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .finally(() => setLoading(false));
  };

  const authInfo = {
    user,
    NewUser,
    logIn,
    logOut,
    loading,
    googleLogIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProviders.propTypes = {
  children: PropTypes.node,
};

export default AuthProviders;
