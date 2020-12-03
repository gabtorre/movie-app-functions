const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()
const db = admin.firestore()

exports.post = functions.https.onRequest(async (request, response) => {
    const snapshot = await db.collection('post').get()
    const post = snapshot.empty
        ? []
        : snapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id }))
    response.send(post)
})

exports.createPost = functions.https.onRequest(async (request, response) => {
    const body = JSON.parse(request.body)
    const text = body.text
    const ref = await db.collection('post').add( {text})
    response.send({id: ref.id, text})
})