import * as admin from "firebase-admin";

admin.initializeApp();

export * from "./auth";
export * from "./workspaces";
export * from "./users";
export * from "./appointments";
export * from "./patients";
export * from "./files";
export * from "./consultations";
export * from "./templates";
