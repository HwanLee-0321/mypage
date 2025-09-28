
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// 1. Path to the service account key file
// Relative to the script execution location: ../serviceAccountKey.json
const serviceAccount = require('../serviceAccountKey.json');

// 2. Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 3. Data source path
// Relative to the script execution location: ../src/assets/static
const dataDir = path.join(__dirname, '../src/assets/static');
const filesToUpload = ['awards', 'education', 'experience', 'projects', 'skills'];

const uploadFile = async (fileName) => {
  const filePath = path.join(dataDir, `${fileName}.json`);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}. Skipping.`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const collectionRef = db.collection(fileName);

  console.log(`Uploading data for ${fileName}...`);

  // Check if the data is an array or an object
  if (Array.isArray(data)) {
    // If the data is an array: add each item as a separate document
    const batch = db.batch();
    data.forEach(item => {
      const docRef = collectionRef.doc(); // Create a document with an automatic ID
      batch.set(docRef, item);
    });
    await batch.commit();
    console.log(`Successfully uploaded ${data.length} documents to ${fileName} collection.`);
  } else {
    // If the data is an object: add as a single document (document ID is set to be the same as the collection name)
    const docRef = collectionRef.doc(fileName);
    await docRef.set(data);
    console.log(`Successfully uploaded single document to ${fileName} collection with ID '${fileName}'.`);
  }
};

const uploadAll = async () => {
  for (const fileName of filesToUpload) {
    await uploadFile(fileName);
  }
  console.log('All data uploaded successfully!');
  process.exit(0);
};

uploadAll().catch(error => {
  console.error('Error uploading data:', error);
  process.exit(1);
});
