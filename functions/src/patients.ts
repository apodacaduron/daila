import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onCreatePatient = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) return;

  const patientsRef = admin.firestore().collection("patients").doc();
  await patientsRef.set({
    ...data,
    id: patientsRef.id,
    createdById: context.auth.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});

export const onUpdatePatient = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) return;

  const patientsRef = admin.firestore().collection("patients").doc(data.id);
  await patientsRef.update({
    ...data,
    updatedById: context.auth.uid,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});

export const onDeletePatient = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) return;

  const patientsRef = admin.firestore().collection("patients").doc(data.id);
  const patient = await patientsRef.get();

  const patientsDeletedRef = admin
      .firestore()
      .collection("patients_deleted")
      .doc(data.id);
  await patientsDeletedRef.set({
    ...patient.data(),
    isDeleted: 1,
    deletedById: context.auth.uid,
    createdAt: admin.firestore.Timestamp.fromDate(new Date(data.createdAt)),
    updatedAt: data.updatedAt ?
      admin.firestore.Timestamp.fromDate(new Date(data.updatedAt)) :
      null,
    deletedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  await patientsRef.delete();
});
