import { AsyncOperationStatus } from "../../utils";
import { Fetchable as FetchOf } from "../fetchableState";

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

export type PostListState = FetchOf<PostList>

export interface PostListState2 {
    lastListFetch: FetchOf<PostList>
    selectedPostId: number
    lastDetailsFetch: FetchOf<PostDetails>
}

export type PostList = (PostBasic | PostDetailsFetchContext)[]