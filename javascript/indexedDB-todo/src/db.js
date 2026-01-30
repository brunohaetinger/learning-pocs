const DB_NAME = "app_DB";
const DB_VERSION = 1;
const STORE_NAME = "clicks";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);

    request.onsuccess = () => {
      resolve(request.result);
    }

    request.onupgradedneeded = (event) => {
      const db = event.target.result;

      // create object store (table)
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: "createdAt"
      })
    }
  })
}
