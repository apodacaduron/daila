import { useFirestoreInfiniteQuery } from '@react-query-firebase/firestore'
import { useFunctionsCall } from '@react-query-firebase/functions'
import { collection, limit, query, startAfter } from 'firebase/firestore'
import { useQueryClient } from 'react-query'
import { firestore, functions } from '../config/firebase'

export const usePatient = () => {
  // Mutations
  const createPatientMutation = useFunctionsCall(functions, 'onCreatePatient')

  // Handlers
  const createPatient = (formData: any) =>
    createPatientMutation.mutateAsync(formData)

  return {
    // Mutations
    createPatientMutation,

    // Handlers
    createPatient,
  }
}

type GetPatientsQueryOptions = {
  limit?: number
  workspaceId: string | undefined,
}
export const useGetPatientsQuery = (
  options: GetPatientsQueryOptions,
) => {
  const patientsCollectionRef = collection(firestore, `workspaces/${options.workspaceId}/patients`)

  const enabled = Boolean(options.workspaceId)
  const queries = enabled
    ? [
      limit(options.limit ?? 20),
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