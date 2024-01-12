const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const router = express.Router();
const firebase = require('../configs/firebase.config')
const {
    collection,
    getFirestore,
    getDocs,
    query,
    where
} = require('firebase/firestore')
const db = getFirestore(firebase)

router.post('/login', async function(req, res, next) {
    const { username, password } = req.body

    let user
    let users = await getDocs(
        query(
            collection(db, 'users'),
            where('username', '==', username)
        )
    )

    if (!users.empty) {
        users = users.docs.map(doc => doc.data())
        user = (users.length > 0) ? users[0] : null
    } else {
        return res.status(401).json({
            status: 401,
            message: 'Invalid username or password',
        })
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)
    if (!isPasswordMatched) {
        return res.status(401).json({
            status: 401,
            message: 'Invalid username or password',
        })
    }

    const jwtToken = jwt.sign({ id: user.id }, 'test')

    res.status(200).json({
        status: 200,
        message: 'Success to login',
        data: {
            access_token: jwtToken,
            user: {
                id: user.id,
                username: user.username,
            }
        },
    })
});

module.exports = router;
