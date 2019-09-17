import { AsyncOperationStatus } from "../../utils";
import { FetchOf } from "../fetchableState";

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
    lastUserDetailsFetch: FetchOf<UserDetails> & { userId?: number }
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
}