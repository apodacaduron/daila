import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onCreateWorkspace = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) return;

  const workspacesRef = admin.firestore().collection("workspaces").doc();
  const specialistWorkspacesRef = admin.firestore().collection("specialistWorkspaces").doc(context.auth.uid);
  const usersRef = admin.firestore().collection("users").doc(context.auth.uid);

  await workspacesRef.set({
    ...data,
    id: workspacesRef.id,
    createdById: context.auth.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  const specialistWorkspacesSnapshot = await specialistWorkspacesRef.get()
  const specialistWorkspaces = specialistWorkspacesSnapshot.data()
  await specialistWorkspacesRef.set({
    workspaces: [...specialistWorkspaces?.workspaces, workspacesRef.id]
  });

  await usersRef
      .update({
        userSettings: {
          hasWorkspace: true,
          lastWorkspace: {...data, id: workspacesRef.id},
        }
      });
});
