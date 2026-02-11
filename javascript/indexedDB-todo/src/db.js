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

      // Create indexes
      store.createIndex("createdAt", "createdAt")
    }
  })
}

async function saveSummary(item) {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite")
    const store = tx.objectStore(STORE_NAME)

    const request = store.put({
      title: item.title,
      createdAt: Date.now(),
    })

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  })
}
