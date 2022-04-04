import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export const onCreateWorkspace = functions.https.onCall(
  async (data, context) => {
    if (!context.auth)
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The function must be called while authenticated.',
      )

    const workspaceRef = admin.firestore().collection('workspaces').doc()
    const userRef = admin.firestore().collection('users').doc(context.auth.uid)

    await workspaceRef.set({
      ...data,
      id: workspaceRef.id,
      createdById: context.auth.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    const specialistWorkspaceRef = workspaceRef
      .collection('specialists')
      .doc(context.auth.uid)
    await specialistWorkspaceRef.set({
      id: context.auth.uid,
      role: 'owner',
    })

    const userSnapshot = await userRef.get()
    const user = userSnapshot.data()

    await userRef.update({
      specialistSettings: {
        lastWorkspaceId: workspaceRef.id,
        workspaces: {
          ...user?.specialistSettings.workspaces,
          [workspaceRef.id]: {
            ...data,
            id: workspaceRef.id,
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
