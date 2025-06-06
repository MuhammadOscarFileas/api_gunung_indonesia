import admin from 'firebase-admin';

const base64 = process.env.FIREBASE_CONFIG_BASE64;


if (!base64) {
  throw new Error('Missing FIREBASE_CONFIG_BASE64 environment variable');
}

const jsonString = Buffer.from(base64, 'base64').toString('utf-8');
const firebaseConfig = JSON.parse(jsonString);

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: firebaseConfig.project_id,
    clientEmail: firebaseConfig.client_email,
    privateKey: firebaseConfig.private_key.replace(/\\n/g, '\n'),
  }),
});

export default admin;
