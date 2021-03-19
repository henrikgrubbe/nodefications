const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

export function initFirebase(dbUrl: string) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: dbUrl
    });
    console.info("Initialized Firebase SDK");
}
