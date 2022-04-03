import { useFirestoreInfiniteQuery } from '@react-query-firebase/firestore'
import { collection, limit, query, startAfter, where } from 'firebase/firestore'
import { useQueryClient } from 'react-query'
import { firestore } from '../config/firebase'

export const usePatient = () => {

  return {}
}

type GetPatientsQueryOptions = {
  limit?: number
  workspaceId: string | undefined,
}
export const useGetPatientsQuery = (
  options: GetPatientsQueryOptions,
) => {
  const patientsCollectionRef = collection(firestore, 'patients')

  const enabled = Boolean(options.workspaceId)
  const queries = enabled
    ? [
      limit(options.limit ?? 2),
      where('workspaceId', '==', options.workspaceId),
    ]
    : []
  const q = query(patientsCollectionRef, ...queries)

  return useFirestoreInfiniteQuery(
    ['patients', { workspaceId: options.workspaceId }],
    q,
    (snapshot) => {
      const lastDocument = snapshot.docs[snapshot.docs.length - 1]
      if (!lastDocument) return
      return query(q, startAfter(lastDocument))
    },
    {},
    {
      enabled,
    },
  )
}

export const useInvalidatePatientsQueries = () => {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries('patients')
}