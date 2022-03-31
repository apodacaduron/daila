import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onCreateWorkspace = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) return;

  const workspacesRef = admin.firestore().collection("workspaces").doc();
  const usersRef = admin.firestore().collection("users").doc(context.auth.uid);

  await workspacesRef.set({
    ...data,
    id: workspacesRef.id,
    users: [context.auth.uid],
    createdById: context.auth.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  await usersRef
      .update({
        hasWorkspace: true,
        lastWorkspace: {...data, id: workspacesRef.id},
      });
});
