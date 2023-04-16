// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyCjcDGMNP0tWmWjDZrfZnUPHbRNOJmig7k',
  authDomain: 'fir-9-85190.firebaseapp.com',
  projectId: 'fir-9-85190',
  storageBucket: 'fir-9-85190.appspot.com',
  messagingSenderId: '225194412785',
  appId: '1:225194412785:web:61f44bda4b36c842f9b750',
  measurementId: 'G-8CKVWW56JW',
};
// init firebase app
initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db, 'hotels');

// getDocs(colRef).then((snap) => {
//   let hotels = [];
//   snap.docs.forEach((doc) => {
//     hotels.push({ ...doc.data(), id: doc.id });
//   });
//   console.log(hotels);
// });

// querying
const q = query(colRef, orderBy('createdAt'));

onSnapshot(q, (snap) => {
  let hotels = [];
  snap.docs.forEach((doc) => {
    hotels.push({ ...doc.data(), id: doc.id });
  });
  console.log(hotels);
});
// get queries

// addning hotel
const addHotel = document.querySelector('.add');
addHotel.addEventListener('submit', (e) => {
  e.preventDefault();
  addDoc(colRef, {
    name: addHotel.name.value,
    address: addHotel.address.value,
    budget: addHotel.budget.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addHotel.reset();
  });
});

const deleteHotel = document.querySelector('.delete');
deleteHotel.addEventListener('submit', (e) => {
  e.preventDefault();
  const docRef = doc(db, 'hotels', deleteHotel.id.value);
  deleteDoc(docRef).then(() => {
    deleteHotel.reset();
  });
});
// gting  single doc
const docRef = doc(db, 'hotels', 'K7ccAwYV1FsqrNWCd8S3');
getDoc(docRef).then((doc) => {
  console.log('single doc', doc.data(), doc.id);
});

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});
