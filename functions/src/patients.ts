import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

const createAccount = async (user: any) => {
  if (!user.email || !user.phoneNumber || !user.name)
  throw new functions.https.HttpsError(
    'invalid-argument',
    'The function must be called with the following arguments "email", "phoneNumber", "name"',
  )

  const userFoundByEmail = await admin.auth().getUserByEmail(user.email).catch(() => {})
  if (userFoundByEmail) return userFoundByEmail

  const userFoundByPhoneNumber = await admin
    .auth()
    .getUserByPhoneNumber(user.phoneNumber).catch(() => {})
  if (userFoundByPhoneNumber) return userFoundByPhoneNumber

  const authUser = await admin.auth().createUser({
    email: user.email,
    phoneNumber: user.phoneNumber,
    displayName: user.name,
  })
  await admin.auth().setCustomUserClaims(authUser.uid, {
    role: 'USER',
  })

  return authUser
}

export const onCreatePatient = functions.https.onCall(async (data, context) => {
  if (!context.auth)
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
    )

  // TODO: Add validation to prevent specialist from joining workspaces as patients if they already belong as specialists
  const authUser = await createAccount(data.user)
  // TODO: After create auth account i need to create user too
  const workspaceRef = admin
    .firestore()
    .collection('workspaces')
    .doc(data.workspaceId)
  const patientWorkspaceRef = workspaceRef
    .collection('patients')
    .doc(authUser.uid)
  await patientWorkspaceRef.set({
    ...data.user,
    id: patientWorkspaceRef.id,
    createdById: context.auth.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  })
})

// export const onUpdatePatient = functions.https.onCall(async (data, context) => {
//   if (!context.auth?.uid) return;

//   const patientsRef = admin.firestore().collection("patients").doc(data.id);
//   await patientsRef.update({
//     ...data,
//     updatedById: context.auth.uid,
//     updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//   });
// });

// export const onDeletePatient = functions.https.onCall(async (data, context) => {
//   if (!context.auth?.uid) return;

//   const patientsRef = admin.firestore().collection("patients").doc(data.id);
//   const patient = await patientsRef.get();

//   const patientsDeletedRef = admin
//       .firestore()
//       .collection("patients_deleted")
//       .doc(data.id);
//   await patientsDeletedRef.set({
//     ...patient.data(),
//     isDeleted: 1,
//     deletedById: context.auth.uid,
//     createdAt: admin.firestore.Timestamp.fromDate(new Date(data.createdAt)),
//     updatedAt: data.updatedAt ?
//       admin.firestore.Timestamp.fromDate(new Date(data.updatedAt)) :
//       null,
//     deletedAt: admin.firestore.FieldValue.serverTimestamp(),
//   });

//   await patientsRef.delete();
// });
