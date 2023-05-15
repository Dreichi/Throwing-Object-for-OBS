import { db } from '../firebaseConfig';
import { collection, doc, getDoc, setDoc, getDocs } from 'firebase/firestore';

export const getUser = async (username) => {
  const usersCollection = collection(db, 'users');
  const userDocRef = doc(usersCollection, username);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data();
  } else {
    return null;
  }
};

export const setUser = async (username, data) => {
  try {
    const usersCollection = collection(db, 'users');
    const userDocRef = doc(usersCollection, username);
    await setDoc(userDocRef, { ...data}, { merge: true });
  } catch (error) {
    console.error("Error writing document:", error);
  }
};

export const getFeatures = async () => {
  const featuresCollection = collection(db, 'features');
  const featureSnapshot = await getDocs(featuresCollection);
  return featureSnapshot.docs.map(doc => doc.data());
};
