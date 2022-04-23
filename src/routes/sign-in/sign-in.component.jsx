import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils"

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    const usrDocRef = await createUserDocumentFromAuth(user)
  }

  return (
    <div className="">
      <h1>Sign in</h1>
      <button onClick={() => logGoogleUser()}>sign in with google</button>
    </div>
  )
}

export default SignIn
