import { AsyncOperationStatus } from "../../utils";
import { FetchOf } from "../../utils";
import { Overwrite } from 'utility-types';

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

export interface PostDetailsFetchContext {
    type: 'PostDetailsFetchContext'
    basic: PostBasic
    details?: PostDetails
    status: AsyncOperationStatus
}

export interface PostListState {
    lastListFetch: FetchOf<PostBasic[]>
    selectedPostId?: number
    lastDetailsFetch: FetchOf<PostDetails>
    lastUserDetailsFetch: FetchOf<UserDetails> & { clientId?: string }
}

export type PostListViewData = FetchOf<(PostBasic | PostDetailsFetchContext)[]>

export interface UserDetails {
    id: number
    name: string
    email: string
    phone: string
    address: {
        street: string
        suite: string
        city: string
    }
    todos: Todo[]
}

interface UserDetailsViewDataTodos {
    completed: TodoBasic[]
    uncompleted: TodoBasic[]
}

export type UserDetailsViewData = Overwrite<UserDetails, { todos: UserDetailsViewDataTodos }>

export interface TodoBasic {
    id: number
    title: string
}

export interface Todo extends TodoBasic {
    userId: number
    completed: boolean
}