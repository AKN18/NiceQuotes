import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAXuOVLT6ClPl-v5-Tdq1sTf52MF1E90qA",
  authDomain: "nicequotes-30078.firebaseapp.com",
  projectId: "nicequotes-30078",
  storageBucket: "nicequotes-30078.appspot.com",
  messagingSenderId: "779009177089",
  appId: "1:779009177089:web:b79e3a14f7f49f877d3200"
};


export default class Firebase {
  static db;

  static init() {
    const app = initializeApp(firebaseConfig);
    Firebase.db = getFirestore(app);
  }

  static async getQuotes() {
    let quotes = [];
    const querySnapshot = await getDocs(
      collection(Firebase.db, 'quotes')
    );
    querySnapshot.forEach((quote) => {
      quotes.push({
        id: quote.id,
        text: quote.data().text,
        author: quote.data().author,
      });
    });
    return quotes;
  }

  static async saveQuote(text, author) {
    const docRef = await addDoc(collection(Firebase.db, 'quotes'), {
      text,
      author,
    });
    return docRef.id;
  }

  static removeQuote(id) {
    deleteDoc(doc(Firebase.db, 'quotes', id));
  }
}
