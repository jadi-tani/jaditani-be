const express = require('express')

const router = express.Router();
const firebase = require('../configs/firebase.config')
const {
    collection,
    getFirestore,
    getDocs,
} = require('firebase/firestore')
const db = getFirestore(firebase)

router.get('/', async function(req, res, next) {
    let crops = await getDocs(collection(db, 'crops'))
    crops = crops.docs.map(doc => doc.data())

    res.status(200).json({
        status: 200,
        message: 'Success to get crops',
        data: crops,
    })
})

module.exports = router
