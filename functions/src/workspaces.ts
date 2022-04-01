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
      uid: context.auth.uid,
      role: 'owner',
    })

    const userSnapshot = await usersRef.get()
    const user = userSnapshot.data()

    await usersRef.update({
      userSettings: {
        hasWorkspace: true,
        lastWorkspace: { ...data, id: workspacesRef.id },
        workspaces: {
          ...user?.userSettings.workspaces,
          [workspacesRef.id]: {
            name: data.name,
            role: 'owner',
          },
        }
      },
    })
  },
)
