import { PostBasic, PostDetails } from '../../data';

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

export interface State {
    data: (PostBasic | PostDetails)[]
}