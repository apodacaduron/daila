import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onCreateConsultation = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) return;
  if (!data.patient.id) throw new Error("Patient id not provided");

  const consultationsRef = admin.firestore().collection("consultations").doc();
  await consultationsRef.set({
    ...data,
    id: consultationsRef.id,
    createdById: context.auth.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});

export const onUpdateConsultation = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) return;
  const {createdAt, ...values} = data;

  const consultationsRef = admin.firestore().collection("consultations").doc(data.id);
  await consultationsRef.update({
    ...values,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});
