import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onUpdateUser = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) return;

  const usersRef = admin.firestore().collection("users").doc(context.auth?.uid);
  await usersRef
      .update({
        ...data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
});
