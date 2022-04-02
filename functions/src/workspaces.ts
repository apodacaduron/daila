import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export const onCreateWorkspace = functions.https.onCall(
  async (data, context) => {
    if (!context.auth)
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The function must be called while authenticated.',
      )

    const workspacesRef = admin.firestore().collection('workspaces').doc()
    const usersRef = admin.firestore().collection('users').doc(context.auth.uid)

    await workspacesRef.set({
      ...data,
      id: workspacesRef.id,
      createdById: context.auth.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    const specialistWorkspacesRef = workspacesRef
      .collection('specialists')
      .doc(context.auth.uid)
    await specialistWorkspacesRef.set({
      id: context.auth.uid,
      role: 'owner',
    })

    const userSnapshot = await usersRef.get()
    const user = userSnapshot.data()

    await usersRef.update({
      specialistSettings: {
        lastWorkspaceId: workspacesRef.id,
        workspaces: {
          ...user?.specialistSettings.workspaces,
          [workspacesRef.id]: {
            ...data,
            id: workspacesRef.id,
            role: 'owner',
          },
        },
      },
    })
  },
)

export const onSwitchWorkspace = functions.https.onCall(
  async (data, context) => {
    if (!context.auth)
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The function must be called while authenticated.',
      )

    const workspacesRef = admin
      .firestore()
      .collection('workspaces')
      .doc(data.id)
    const workspaceSnapshot = await workspacesRef.get()

    if (!workspaceSnapshot.exists)
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The provided workspace id does not exist',
      )

    const usersRef = admin.firestore().collection('users').doc(context.auth.uid)

    await usersRef.update({
      ['specialistSettings.lastWorkspaceId']: workspacesRef.id,
    })
  },
)
