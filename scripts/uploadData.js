
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// 1. 서비스 계정 키 파일 경로
// 스크립트 실행 위치 기준으로 ../serviceAccountKey.json
const serviceAccount = require('../serviceAccountKey.json');

// 2. Firebase Admin SDK 초기화
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 3. 데이터 소스 경로
// 스크립트 실행 위치 기준으로 ../src/assets/static
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

  // 데이터가 배열인지 객체인지 확인
  if (Array.isArray(data)) {
    // 데이터가 배열일 경우: 각 항목을 개별 문서로 추가
    const batch = db.batch();
    data.forEach(item => {
      const docRef = collectionRef.doc(); // 자동 ID로 문서 생성
      batch.set(docRef, item);
    });
    await batch.commit();
    console.log(`Successfully uploaded ${data.length} documents to ${fileName} collection.`);
  } else {
    // 데이터가 객체일 경우: 단일 문서로 추가 (문서 ID는 컬렉션 이름과 동일하게 설정)
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
