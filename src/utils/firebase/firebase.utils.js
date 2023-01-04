import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtHDjdQjjokaTJlbrxp4xyAOiJbR4ymko",
  authDomain: "crwn-clothing-be819.firebaseapp.com",
  projectId: "crwn-clothing-be819",
  storageBucket: "crwn-clothing-be819.appspot.com",
  messagingSenderId: "372873381770",
  appId: "1:372873381770:web:cfba6d0a7e2663ca01ea73",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "user", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
        await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
        console.log('Error creating the user', error.message);
      }
  }
  return userDocRef;

};
