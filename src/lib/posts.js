import firestore from '@react-native-firebase/firestore'

const postsCollection = firestore().collection('posts')

export function createPost({user, photoUrl, description}) {
    return postsCollection.add({
        user,
        photoUrl,
        description,
        createdAt: firestore.FieldValue.serverTimestamp()
    })
}

export async function getPosts() {
    const snapshot = await postsCollection.orderBy('createdAt', 'desc').get()

    const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    return posts
}