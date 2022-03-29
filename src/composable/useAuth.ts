import {
  useAuthCreateUserWithEmailAndPassword,
  useAuthReload,
  useAuthSendPasswordResetEmail,
  useAuthSignInWithEmailAndPassword,
  useAuthSignInWithPopup,
  useAuthSignOut,
  useAuthUser,
} from '@react-query-firebase/auth'
import { useFunctionsCall } from '@react-query-firebase/functions'
import { GoogleAuthProvider } from 'firebase/auth'
import { auth, functions } from '../config/firebase'

type Provider = GoogleAuthProvider

type SignIn = {
  email: string;
  password: string;
}

export const useAuth = () => {
  // Mutations
  const signInWithEmailAndPasswordMutation = useAuthSignInWithEmailAndPassword(
    auth,
  )
  const signInWithPopupMutation = useAuthSignInWithPopup(auth)
  const createUserWithEmailAndPasswordMutation = useAuthCreateUserWithEmailAndPassword(
    auth,
  )
  const sendPasswordResetEmailMutation = useAuthSendPasswordResetEmail(auth)
  const signOutMutation = useAuthSignOut(auth)
  const authReloadMutation = useAuthReload()
  const signUpMutation = useFunctionsCall(functions, 'onSignUp')

  // Query
  const authUserQuery = useAuthUser(['user'], auth)

  // Variables
  const isLoading =
    signInWithPopupMutation.isLoading ||
    createUserWithEmailAndPasswordMutation.isLoading ||
    signUpMutation.isLoading

  // Handlers
  const signInWithPopup = async (provider: Provider) => {
    await signInWithPopupMutation.mutateAsync({
      provider,
    })
    await signUpMutation.mutateAsync({})
  }

  const signInWithCredentials = async (data: SignIn) =>
    signInWithEmailAndPasswordMutation.mutateAsync(data)

  const signUpWithCredentials = async (data: SignIn) => {
    await createUserWithEmailAndPasswordMutation.mutateAsync(data)
    await signUpMutation.mutateAsync({})
  }

  const sendResetPasswordEmail = (data: Omit<SignIn, 'password'>) =>
    sendPasswordResetEmailMutation.mutateAsync({ email: data.email })

  const signOut = () => signOutMutation.mutateAsync()

  return {
    // Mutations
    signInWithEmailAndPasswordMutation,
    signInWithPopupMutation,
    createUserWithEmailAndPasswordMutation,
    signUpMutation,
    sendPasswordResetEmailMutation,

    // Queries
    authUserQuery,

    // Variables
    isLoading,

    // Handlers
    signInWithPopup,
    signInWithCredentials,
    signUpWithCredentials,
    sendResetPasswordEmail,
    signOut,
  }
}
