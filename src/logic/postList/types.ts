import { AsyncOperationStatus } from "../../utils";
import { Fetchable } from "../fetchableState";

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

export type PostListState = Fetchable<PostList>

export type PostList = (PostBasic | PostDetailsFetchContext)[]