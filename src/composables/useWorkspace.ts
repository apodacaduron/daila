import { useFunctionsCall } from '@react-query-firebase/functions'
import { collection, doc } from 'firebase/firestore'
import { firestore, functions } from '../config/firebase'
import { Workspace } from '../utils/types/workspace'

export const useWorkspace = () => {
  const createWorkspaceMutation = useFunctionsCall(functions, 'onCreateWorkspace')

  const createWorkspace = (formData: Pick<Workspace, 'name' | 'description'>) =>
    createWorkspaceMutation.mutateAsync(formData)

  return {
    // Mutations
    createWorkspaceMutation,

    // Handlers
    createWorkspace,
  }
}

// export const useGetWorkspacesQuery = (userId: string | undefined) => {
//   const workspacesCollectionRef = collection(firestore, 'workspaces')
//   const workspaceDocRef = doc(workspacesCollectionRef)
//   const enabled = Boolean(userId)

//   const queries = enabled
//     ? [
//         where('s', 'array-contains', context.userId),
//       ]
//     : []
//   const q = query(workspaceCollection, ...queries)

//   return useFirestoreInfiniteQuery(
//     ['workspaces', { userId }],
//     q,
//     (snapshot) => {
//       const lastDocument = snapshot.docs[snapshot.docs.length - 1]
//       if (!lastDocument) return
//       return query(q, startAfter(lastDocument))
//     },
//     {},
//     {
//       enabled,
//       refetchOnWindowFocus: false,
//     },
//   )
// }

// export const useGetWorkspacesQuery = (workspaceIds: string[]) => {
//   const workspacesCollectionRef = collection(firestore, 'workspaces')
//   const workspaceDocRef = doc(workspacesCollectionRef, userId)
//   const enabled = Boolean(userId)

  


//   const queries = enabled
//     ? [
//         where('users', 'array-contains', context.userId),
//       ]
//     : []
//   const workspaceCollection = getCollection('workspaces')
//   const q = query(workspacesCollectionRef, )

//   return useFirestoreInfiniteQuery(
//     ['workspaces', { userId }],
//     q,
//     (snapshot) => {
//       const lastDocument = snapshot.docs[snapshot.docs.length - 1]
//       if (!lastDocument) return
//       return query(q, startAfter(lastDocument))
//     },
//     {},
//     {
//       enabled,
//       refetchOnWindowFocus: false,
//     },
//   )
// }

// export const useInvalidateWorkspacesQueries = () => {
//   const queryClient = useQueryClient()
//   return () => queryClient.invalidateQueries('workspaces')
// }