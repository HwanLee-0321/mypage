
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
  const existingSnapshot = await collectionRef.get();
  const existingSignatures = new Set(
    existingSnapshot.docs.map((doc) => getSignature(doc.data()))
  );

  console.log(`Uploading data for ${fileName}...`);

  // Check if the data is an array or an object
  if (Array.isArray(data)) {
    // If the data is an array: add each item as a separate document
    const batch = db.batch();
    let newDocsCount = 0;

    data.forEach(item => {
      const signature = getSignature(item);
      if (existingSignatures.has(signature)) {
        console.log(`Skipping duplicate document in ${fileName}: ${signature}`);
        return;
      }

      const docRef = collectionRef.doc(); // Create a document with an automatic ID
      batch.set(docRef, item);
      existingSignatures.add(signature);
      newDocsCount += 1;
    });

    if (newDocsCount > 0) {
      await batch.commit();
      console.log(`Successfully uploaded ${newDocsCount} new documents to ${fileName} collection.`);
    } else {
      console.log(`No new documents to upload for ${fileName}.`);
    }
  } else {
    // If the data is an object: add as a single document (document ID is set to be the same as the collection name)
    const docRef = collectionRef.doc(fileName);
    const signature = getSignature(data);

    if (existingSignatures.has(signature)) {
      console.log(`Skipping ${fileName} document upload because identical data already exists.`);
    } else {
      await docRef.set(data);
      console.log(`Successfully uploaded single document to ${fileName} collection with ID '${fileName}'.`);
    }
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
