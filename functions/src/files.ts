import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onCreateFile = functions.https.onCall(async (data, context) => {
  if (!context.auth)
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
  if (!data.patient.id)
    throw new functions.https.HttpsError('failed-precondition', 'A patient must be provided to call this function');

  try {
    const filesRef = admin.firestore().collection("files").doc(data.patient.id);
    await filesRef.set({
      ...data,
      id: data.patient.id,
      createdById: context.auth.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (err) {
    throw new functions.https.HttpsError('unknown', err.message, err);
  }
});

export const onUpdateFile = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
  }
  const {createdAt, ...values} = data;

  const filesRef = admin.firestore().collection("files").doc(data.id);
  await filesRef.update({
    ...values,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});
