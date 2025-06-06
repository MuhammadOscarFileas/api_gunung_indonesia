import admin from 'firebase-admin';

const firebaseConfig = JSON.parse(process.env._FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: firebaseConfig.project_id,
    clientEmail: firebaseConfig.client_email,
    privateKey: firebaseConfig.private_key.replace(/\\n/g, '\n') // penting
  })
});

export default admin;
