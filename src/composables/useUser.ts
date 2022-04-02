import { useFirestoreDocument } from '@react-query-firebase/firestore'
import { collection, doc } from 'firebase/firestore'
import { useQueryClient } from 'react-query'
import { firestore } from '../config/firebase'
import { useAuth } from './useAuth'

export const useGetUserQuery = () => {
  const authInstance = useAuth()
  const userId = authInstance.authUserQuery.data?.uid

  const usersCollectionRef = collection(firestore, 'users')
  const userDocRef = doc(usersCollectionRef, userId)
  const enabled = Boolean(userId)

  return useFirestoreDocument(['user', userId], userDocRef, {}, { enabled })
}

export const useInvalidateUserQueries = () => {
  const authInstance = useAuth()
  const userId = authInstance.authUserQuery.data?.uid

  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries(['user', userId])
}