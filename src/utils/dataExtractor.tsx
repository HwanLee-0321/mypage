import { db } from '../firebase'; // Import the db instance from your firebase.ts
import { collection, getDocs } from 'firebase/firestore';

export const getData = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error(`Error fetching data from collection "${collectionName}":`, error);
    return []; // Return an empty array on error
  }
};
