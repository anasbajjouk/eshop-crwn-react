import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils"
import SignUpForm from "../../components/sign-up-form/sign-up-form.components"

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
  }

  return (
    <div className="">
      <h1>Sign in</h1>
      <button onClick={() => logGoogleUser()}>sign in with google</button>

      <SignUpForm />
    </div>
  )
}

export default SignIn
