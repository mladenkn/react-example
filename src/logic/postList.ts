import { PostDetails, PostBasic, postBasicList, getPostDetails, getPostBasic } from "../data";
import { Middleware, } from "redux-starter-kit";
import { AppState } from "./store";
import { createReducer, ActionType, getType, createAction } from 'typesafe-actions';

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

const privateActions = {
    setSelectedPost: createAction('postList/setSelectedPost', 
        a => (nextSelectedDetails: PostDetails, currentlySelectedBasic?: PostBasic) => a({nextSelectedDetails, currentlySelectedBasic})
    ),
}

const publicActions = {
    onPostBasicClick: createAction('postList/onPostBasicClick', a => (id: number) => a(id)),
}

const a = { ...privateActions, ...publicActions }
export const postListActions = publicActions;
type RootAction = ActionType<typeof a>

export const postListMiddleware: Middleware<{}, AppState> = store => next => (action: RootAction) => {

    switch(action.type){

        case getType(a.onPostBasicClick): 
            const state = store.getState().postList
            const postId = action.payload;
            const nextSelectedPostDetails = getPostDetails(postId)!;
            const currentlySelectedPost = state.data.find(p => p.type === 'PostDetails');
            const currentlySelectedPostBasic = currentlySelectedPost && getPostBasic(currentlySelectedPost.id)
            store.dispatch(a.setSelectedPost(nextSelectedPostDetails, currentlySelectedPostBasic))
            break;
    }

    return next(action)
}

export const postListReducer = createReducer<PostListState, RootAction>(initialState)
    .handleAction(a.setSelectedPost, (state, action) => {
        const {nextSelectedDetails, currentlySelectedBasic} = action.payload
        
        const postListCopy = state.data.map(p => p)

        if(currentlySelectedBasic){
            const indexOfCurrentlySelected = state.data.findIndex(p => p.id === currentlySelectedBasic.id)
            postListCopy[indexOfCurrentlySelected] = currentlySelectedBasic
        }
        
        const indexOfNextSelected = state.data.findIndex(p => p.id === nextSelectedDetails.id)        
        postListCopy[indexOfNextSelected] = nextSelectedDetails

        return {data: postListCopy}
    })