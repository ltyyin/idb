import { openDB } from 'idb/with-async-ittr.js'

async function initCandidateDB() {
	const idbDatabase = await openDB('CandidateList', 1, {
		upgrade(db) {
			db.createObjectStore('custom_data', {
				keyPath: 'id',
				autoIncrement: true,
			})

			db.createObjectStore('relation_data', {
				keyPath: 'id',
				autoIncrement: true,
			})
		},
	})

	return idbDatabase
}

function getObjectStore(db, store_name, mode = 'readwrite') {
	const tx = db.transaction(store_name, mode)
	// return tx.objectStore(store_name)
	return tx
}

export { initCandidateDB, getObjectStore }
