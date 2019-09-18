import { PostDetails, PostBasic, UserBasic, PostDetailsComment, UserDetails, Todo } from "./types"
import { getRandomArrayElement } from "../../utils"

const baseUrl = 'https://jsonplaceholder.typicode.com'

async function fetchUserBasic(p: {email?: string, id?: number}): Promise<UserBasic> {
    let user: any;
    if(p.email){
        const users = await fetch(`${baseUrl}/users/`).then(r => r.json());
        // comments contain some non existing users, in that case i get the random one
        user = users.find((u: any) => u.email === p.email) || getRandomArrayElement(users);
    } 
    else if(p.id)
        user = await fetch(`${baseUrl}/users/${p.id}`).then(r => r.json());
    else
        throw new Error();
    
    return { id: user.id, name: user.name };
}

async function fetchPostComments(postId: number): Promise<PostDetailsComment[]> {
    const comments = await fetch(`${baseUrl}/comments?postId=${postId}`)
        .then(r => r.json())
        .then((r: any[]) => r.slice(0, 10));
        
    const comments_ = Promise.all(comments.map(async (c: any) => {
        const user = await fetchUserBasic({email: c.email as string});
        return { id: c.id, user, body: c.body  };
    }))
    return comments_;
}

export async function fetchPostDetails(postId: number): Promise<PostDetails> {
    const post = await fetch(`${baseUrl}/posts/${postId}`).then(r => r.json());
    const user = await fetchUserBasic({id: post.userId});
    const comments = await fetchPostComments(post.id);
    return { type: 'PostDetails', id: post.id, title: post.title, body: post.body, user, comments };
} 

export async function fetchPostBasic(postId: number): Promise<PostBasic> {
    const post = await fetch(`${baseUrl}/posts/${postId}`).then(r => r.json());
    const user = await fetchUserBasic({id: post.userId});
    return { type: 'PostBasic', id: post.id, title: post.title, user };
}

export async function fetchPostBasicList(): Promise<PostBasic[]> {
    const posts = await fetch(`${baseUrl}/posts`).then(r => r.json());
    console.log('all posts', posts);
    console.log('first post', posts[0]);
    return Promise.all(posts.map(async (p: any) => ({
        type: 'PostBasic',
        id: p.id,
        title: p.title,
        user: await fetchUserBasic({id: p.userId})
    })));
}

function getUserTodos(userId: number): Promise<Todo[]> {
    return fetch(`${baseUrl}/todos?userId=${userId}`).then(r => r.json());
}

export async function fetchUserDetails(id: number): Promise<UserDetails>{
    const user = await fetch(`${baseUrl}/users/${id}`).then(r => r.json()) as UserDetails;
    const todos = await getUserTodos(user.id);
    return { ...user, todos }; 
}