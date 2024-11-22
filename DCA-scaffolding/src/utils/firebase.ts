
import { collection } from "firebase/firestore";
import { appState } from '../store';


let db: any;

const getFirebaseInstance = async () => {
  if (!db) {
    const { getFirestore } = await import("firebase/firestore");
    const { initializeApp } = await import("firebase/app");

    const firebaseConfig = {
        apiKey: "AIzaSyB_aeO8a76Zr-27eAegXT_A1cX3ozBD6io",
        authDomain: "parcial--3.firebaseapp.com",
        projectId: "parcial--3",
        storageBucket: "parcial--3.firebasestorage.app",
        messagingSenderId: "808855223615",
        appId: "1:808855223615:web:48fdd047730d3dbdfee78a",
        measurementId: "G-TSLYHP64YS"
      };

    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);

  }
  return {db};

};

export const addProducts = async (product: any) => {
	try {
		const { db } = await getFirebaseInstance();
		const { collection, addDoc } = await import('firebase/firestore');

		const where = collection(db, 'products');
		
		await addDoc(where, product);
	} catch (error) {
		console.error('Error adding document', error);
	}
};

export const getProducts = async () => {
    try {
		const { db } = await getFirebaseInstance();
		const { collection, getDocs } = await import('firebase/firestore');

		const where = collection(db, 'products');
		const querySnapshot = await getDocs(where);
		const data: any[] = [];

		querySnapshot.forEach((doc: any) => {
			data.push({...doc.data(), firebaseID: doc.id});
		});

		return data;
	} catch (error) {
		console.error('Error getting documents', error);
		
	}
};


export const uploadFile = async (file: File, dir: string, id: string) => {
	const { storage } = await getFirebaseInstance();
	const { ref, uploadBytes } = await import('firebase/storage');

	const storageRef = ref(storage, `${dir}/${id}`);
	await uploadBytes(storageRef, file).then((snapshot) => {
		console.log('File uploaded');
	});
};

export const getFile = async (id: string, dir: string) => {
	const { storage } = await getFirebaseInstance();
	const { ref, getDownloadURL } = await import('firebase/storage');

	const storageRef = ref(storage, `${dir}/${id}`);
	const urlImg = await getDownloadURL(ref(storageRef))
		.then((url) => {
			return url;
		})
		.catch((error) => {
			console.error(error);
		});

	return urlImg;
};