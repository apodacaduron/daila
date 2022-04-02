import { useFunctionsCall } from '@react-query-firebase/functions'
import React from 'react'
import { functions } from '../config/firebase'
import type { Workspace } from '../utils/types/workspace'
import { useGetUserQuery } from './useUser'

export const useWorkspace = () => {
  // Queries
  const getUserQuery = useGetUserQuery()

  // Variables
  const lastWorkspaceId = getUserQuery.data?.data()?.specialistSettings?.lastWorkspaceId
  const workspaces = getUserQuery.data?.data()?.specialistSettings?.workspaces
  const workspacesList = Object.values(getUserQuery.data?.data()?.specialistSettings?.workspaces ?? [])

  // State
  const [currentWorkspace, setCurrentWorkspace] = React.useState(getUserQuery.data?.data()?.specialistSettings?.workspaces?.[lastWorkspaceId])

  // Mutations
  const createWorkspaceMutation = useFunctionsCall(functions, 'onCreateWorkspace')
  const switchWorkspaceMutation = useFunctionsCall(functions, 'onSwitchWorkspace')


  // Handlers
  const createWorkspace = (formData: Pick<Workspace, 'name' | 'description'>) =>
    createWorkspaceMutation.mutateAsync(formData)

  const switchWorkspace = (workspace: any) => {
    setCurrentWorkspace(workspace)
    switchWorkspaceMutation.mutateAsync(workspace)
  }


  return {
    // Mutations
    createWorkspaceMutation,

    // Variables
    lastWorkspaceId,
    workspaces,
    workspacesList,

    // State
    currentWorkspace,

    // Handlers
    createWorkspace,
    switchWorkspace,
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