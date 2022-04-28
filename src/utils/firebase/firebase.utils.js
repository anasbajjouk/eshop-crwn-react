import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwre1Wm_djNAkG7Rg5uUhctIYcjXloHH4",
  authDomain: "crown-db-cee7b.firebaseapp.com",
  databaseURL: "https://crown-db-cee7b.firebaseio.com",
  projectId: "crown-db-cee7b",
  storageBucket: "crown-db-cee7b.appspot.com",
  messagingSenderId: "1035316961372",
  appId: "1:1035316961372:web:48dbac2a8d6a2241",
}

// Initialize Firebase
initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)

export const signOutUser = () => signOut(auth)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return

  const userDocRef = doc(db, "users", userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  //if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    } catch (error) {
      console.log("error creating user", error.message)
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}
