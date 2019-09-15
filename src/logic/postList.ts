import { PostDetails, PostBasic, postBasicList, getPostDetails, getPostBasic } from "../data";
import { Middleware, } from "redux-starter-kit";
import { AppState } from "./store";
import { createStandardAction, createReducer, ActionType } from 'typesafe-actions';

// type FetchablePostDetails = {
//     data: PostDetails | undefined
//     status: 'fetched' | 'fetching'
// }

// export interface PostListState {
//     data: (PostBasic | FetchablePostDetails)[] | undefined
//     status: 'fetched' | 'fetching'
// }

export interface PostListState {
    data: (PostBasic | PostDetails)[]
}

const initialState: PostListState = {
    data: postBasicList
}

const a = {
    onPostBasicClick: createStandardAction('postList/onPostBasicClick')<number>(),
    setSelectedPost: createStandardAction('postList/setSelectedPost')<{next: PostDetails, previous: PostBasic}>(),
}

export const postListActions = a;

type RootAction = ActionType<typeof a>

export const postListMiddleware: Middleware<{}, AppState> = store => next => action => {

    return next(action)
}

export const postListReducer = createReducer<PostListState, RootAction>(initialState)
    .handleAction(a.onPostBasicClick, (state, action) => {
        const postId = action.payload
        const clickedPostDetails = getPostDetails(postId)!

        const indexOfLastActivePost = state.data.findIndex(p => p.type === 'PostDetails')
        const lastActivePost = state.data[indexOfLastActivePost]

        const indexOfClickedPost = state.data.findIndex(p => p.id === postId)
        
        const postListCopy = state.data.map(p => p)
        lastActivePost && (postListCopy[indexOfLastActivePost] = getPostBasic(lastActivePost.id)!)
        postListCopy[indexOfClickedPost] = clickedPostDetails  

        return {data: postListCopy}
    })