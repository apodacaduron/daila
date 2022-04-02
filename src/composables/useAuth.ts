import {
  useAuthCreateUserWithEmailAndPassword,
  useAuthSendPasswordResetEmail,
  useAuthSignInWithEmailAndPassword,
  useAuthSignInWithPopup,
  useAuthSignOut,
  useAuthUser,
} from '@react-query-firebase/auth'
import { useFunctionsCall } from '@react-query-firebase/functions'
import type { GoogleAuthProvider } from 'firebase/auth'
import { auth, functions } from '../config/firebase'
import handleError from '../utils/handleError'
import type { SignIn, SignUp } from '../utils/types/auth'

type Provider = GoogleAuthProvider

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
  const signUpMutation = useFunctionsCall(functions, 'onSignUp')

  // Query
  const authUserQuery = useAuthUser(['user'], auth)

  // Variables
  const isLoading =
    signInWithPopupMutation.isLoading ||
    createUserWithEmailAndPasswordMutation.isLoading ||
    signUpMutation.isLoading
  const isAuthenticated = Boolean(authUserQuery.data)

  // Handlers
  const signInWithPopup = async (provider: Provider) => {
    await signInWithPopupMutation.mutateAsync({
      provider,
    })
    await signUpMutation.mutateAsync({})
  }

  const signInWithCredentials = async (data: SignIn) => {
    try {
      await signInWithEmailAndPasswordMutation.mutateAsync(data)
    } catch (err) {
      handleError(err)
    }
  }

  const signUpWithCredentials = async (data: SignUp) => {
    try {
      await createUserWithEmailAndPasswordMutation.mutateAsync(data)
      await signUpMutation.mutateAsync({})
    } catch (err) {
      handleError(err)
    }
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
    isAuthenticated,

    // Handlers
    signInWithPopup,
    signInWithCredentials,
    signUpWithCredentials,
    sendResetPasswordEmail,
    signOut,
  }
}
