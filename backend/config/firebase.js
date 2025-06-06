import dotenv from 'dotenv';
dotenv.config();

console.log('FIREBASE_CONFIG:', process.env._FIREBASE_CONFIG);

const firebaseConfig = JSON.parse(process.env._FIREBASE_CONFIG);

import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: firebaseConfig.project_id,
    clientEmail: firebaseConfig.client_email,
    privateKey: firebaseConfig.private_key.replace(/\\n/g, '\n')
  })
});

export default admin;
