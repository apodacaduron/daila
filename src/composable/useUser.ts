import { useFirestoreDocument } from '@react-query-firebase/firestore'
import { collection, doc } from 'firebase/firestore'
import { firestore } from '../config/firebase'

export const useGetUserById = (userId: string | undefined) => {
  const usersCollectionRef = collection(firestore, 'users')
  const userDocRef = doc(usersCollectionRef, userId)
  const enabled = Boolean(userId)

  return useFirestoreDocument(['user', userId], userDocRef, {}, { enabled })
}
