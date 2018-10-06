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
      results = results.concat([doc.data()])
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
