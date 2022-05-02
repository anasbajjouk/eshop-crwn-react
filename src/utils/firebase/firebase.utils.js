import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore"

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

export const onAuthStateChangeListener = (callback) => {
  if (callback == null) return
  onAuthStateChanged(auth, callback)
}

export const db = getFirestore()

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories")
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q)

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data()
    acc[title.toLowerCase()] = items
    return acc
  }, {})

  return categoryMap
}

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
