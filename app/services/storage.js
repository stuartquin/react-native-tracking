import firebase from 'firebase';
import 'firebase/firestore';

let db;

export const init = () => {
  firebase.initializeApp({
  });
  db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true});

  return db;
}

export const get = (collection, where = [], order = ['created_at', 'desc']) => {
  if (!db) {
    db = init();
  }
  let query = db.collection(collection).orderBy(...order);

  if (where.length) {
    query = query.where(...where);
  }

  return query.get().then((querySnapshot) => {
    let results = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() || {};
      results = results.concat([{
        ...data,
        id: doc.id,
      }])
    });

    return results;
  });
}

export const add = (collection, item) => {
  if (!db) {
    db = init();
  }

  const timestamped = {
    ...item,
    created_at: firebase.firestore.Timestamp.now()
  }

  return db.collection(collection).add(timestamped).then((docRef) => {
    return true;
  });
}

export const getFormattedDate = (timestamp) => {
  const date = timestamp.toDate();
  const time = date.toTimeString().substring(0, 5);

  return `${date.toDateString()} ${time}`;
};
