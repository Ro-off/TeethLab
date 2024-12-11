import { auth } from './firebase'; // Adjust the path as necessary
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User signed in:', userCredential.user);
      return userCredential.user;
    })
    .catch((error) => {
      console.error('Error signing in:', error);
      throw error;
    });
};

export const doSignOut = () => {
  return signOut(auth);
};