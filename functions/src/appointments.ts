import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onCreateAppointment = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) return;

  const appointmentsRef = admin.firestore().collection("appointments").doc();
  await appointmentsRef.set({
    ...data,
    id: appointmentsRef.id,
    start: admin.firestore.Timestamp.fromDate(new Date(data.start)),
    end: data.end ? admin.firestore.Timestamp.fromDate(new Date(data.end)) : null,
    createdById: context.auth.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});

export const onUpdateAppointment = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) return;

  const appointmentsRef = admin.firestore().collection("appointments").doc(data.id);
  await appointmentsRef.update({
    ...data,
    start: admin.firestore.Timestamp.fromDate(new Date(data.start)),
    end: data.end ? admin.firestore.Timestamp.fromDate(new Date(data.end)) : null,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});
