
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
const filesToUpload = ['awards', 'education', 'experience', 'projects', 'skills', 'certifications'];

const sortObject = (value) => {
  if (Array.isArray(value)) {
    return value.map(sortObject);
  }
  if (value !== null && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = sortObject(value[key]);
        return acc;
      }, {});
  }
  return value;
};

const getSignature = (value) => JSON.stringify(sortObject(value));

const uploadFile = async (fileName) => {
  const filePath = path.join(dataDir, `${fileName}.json`);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}. Skipping.`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const collectionRef = db.collection(fileName);

  // 1. Clear existing collection
  const snapshot = await collectionRef.get();
  if (snapshot.size > 0) {
    console.log(`Clearing ${snapshot.size} documents from ${fileName}...`);
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    console.log(`Collection ${fileName} cleared.`);
  }

  console.log(`Uploading data for ${fileName}...`);

  // 2. Upload new data
  if (Array.isArray(data)) {
    const batch = db.batch();
    let newDocsCount = 0;

    data.forEach((item) => {
      const docRef = collectionRef.doc(); // Create a document with an automatic ID
      batch.set(docRef, item);
      newDocsCount += 1;
    });

    if (newDocsCount > 0) {
      await batch.commit();
      console.log(`Successfully uploaded ${newDocsCount} documents to ${fileName} collection.`);
    }
  } else {
    // If the data is an object: add as a single document
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
