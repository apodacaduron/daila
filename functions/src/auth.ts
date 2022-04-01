import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const env = functions.config();

export const onSignUp = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) return;

  const usersRef = admin.firestore().collection("users");
  const userEmail = context.auth.token.email;
  const userRole = userEmail === env.role.admin ? "ADMIN" : "USER";
  const userExists = (await usersRef.doc(context.auth.uid).get()).exists;

  if (userExists) return {message: "User already exists"};

  await admin.auth().setCustomUserClaims(context.auth.token.uid, {
    role: userRole,
  });
  const currentAuthUser = await admin.auth().getUser(context.auth.uid)
  await usersRef
      .doc(context.auth.uid)
      .set({
        email: currentAuthUser.email ?? null,
        photoURL: currentAuthUser.photoURL ?? null,
        phoneNumber: currentAuthUser.phoneNumber ?? null,
        specialistSettings: {
          lastWorkspaceId: null,
          workspaces: null
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

  return {message: "User has been created on firestore"};
});
