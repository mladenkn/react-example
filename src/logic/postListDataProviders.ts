export interface UserBasic {
    id: number
    name: string
}

export interface PostBasic {
    type: 'PostBasic'
    id: number
    title: string
    user: UserBasic
}

export interface PostDetails {
    type: 'PostDetails'
    id: number
    title: string
    user: UserBasic
    body: string
    comments: PostDetailsComment[]
}

export interface PostDetailsComment {
    id: number
    user: UserBasic
    body: string
}

function getRandomInt(min: number, max: number){
    return Math.floor(Math.random() * max) + min
}

function getRandomArrayElement<T>(arr: T[]){
    const i = getRandomInt(0, arr.length)
    return arr[i]
}

async function fetchUserBasic(userEmail: string): Promise<UserBasic> {
    const users = await fetch(`https://jsonplaceholder.typicode.com/users/`).then(r => r.json())
    const user = users.find((u: any) => u.email === userEmail) || getRandomArrayElement(users)
    return { id: user.id, name: user.name }
}

async function fetchPostComments(postId: number): Promise<PostDetailsComment[]> {
    const comments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(r => r.json())
        .then((r: any[]) => r.slice(0, 10))
        
    const comments_ = Promise.all(comments.map(async (c: any) => {
        const user = await fetchUserBasic(c.email as string)
        return { id: c.id, user, body: c.body  }
    }))
    return comments_
}

export async function fetchPostDetails(postId: number): Promise<PostDetails> {
    console.log('fetcheing')
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(r => r.json())
    console.log('fetched post')
    const user = await fetchUserBasic(post.userId)
    console.log('fetched user')
    const comments = await fetchPostComments(post.id)
    console.log('fetched comments')
    return { type: 'PostDetails', id: post.id, title: post.title, body: post.body, user, comments }
} 