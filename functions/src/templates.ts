import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onCreateTemplate = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) return;

  const templatesRef = admin.firestore().collection("templates").doc(data.patient.id);
  await templatesRef.set({
    ...data,
    id: templatesRef.id,
    createdById: context.auth.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});

export const onUpdateTemplate = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) return;
  const {createdAt, ...values} = data;

  const templatesRef = admin.firestore().collection("templates").doc(data.id);
  await templatesRef.update({
    ...values,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});
