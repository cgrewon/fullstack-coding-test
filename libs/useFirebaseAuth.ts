import { useState, useEffect } from 'react'
import Firebase from 'libs/firebase';

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clear = () => {
    console.log('auth clear func called')
    setAuthUser(null);
    setLoading(false);
  };

  const signInWithEmailAndPassword = (email: string, password: string) =>
    Firebase.auth().signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword  = (email:string, password: string) => {
    return Firebase.auth().createUserWithEmailAndPassword(email, password);
  }
    
    
  const signOut = () =>
      Firebase.auth().signOut().then(clear);
      
  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);
  
  const authStateChanged = async (authState) => {

    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return;
    }

    setLoading(true)
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);

  };

// listen for Firebase state change
  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword ,
    createUserWithEmailAndPassword,
    signOut
  };
}