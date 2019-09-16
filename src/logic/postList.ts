import { PostDetails, PostBasic, postBasicList, getPostDetails, getPostBasic } from "../data";
import { Middleware, } from "redux-starter-kit";
import { AppState } from "./store";
import { createReducer, ActionType, getType, createAction } from 'typesafe-actions';
import { fetchPostDetails, fetchPostBasic } from "./postListDataProviders";

// type FetchablePostDetails = {
//     data: PostDetails | undefined
//     status: 'fetched' | 'fetching'
// }

// export interface PostListState {
//     data: (PostBasic | FetchablePostDetails)[] | undefined
//     status: 'fetched' | 'fetching'
// }

interface State {
    data: (PostBasic | PostDetails)[]
}

const initialState: State = {
    data: postBasicList
}

const publicActions = {
    onPostBasicClick: createAction('postList/onPostBasicClick', p => (id: number) => p(id)),
}

const privateActions = {
    onFetchingPostDetails: createAction('postList/onFetchingPostDetails', p => (postId: number) => p(postId)),
    onFetchedPostDetails: createAction('postList/setSelectedPost', 
        p => (nextSelectedDetails: PostDetails, currentlySelectedBasic?: PostBasic) =>
            p({nextSelectedDetails, currentlySelectedBasic})
    ),
}

const a = { ...privateActions, ...publicActions }
type RootAction = ActionType<typeof a>

const middleware: Middleware<{}, AppState> = store => next => (action: RootAction) => {

    switch(action.type){

        case getType(a.onPostBasicClick): 
            const postId = action.payload;            
            store.dispatch(a.onFetchingPostDetails(postId));
            fetchPostDetails(postId)
                .then(nextSelectedPostDetails => {
                    store.dispatch(a.onFetchedPostDetails(nextSelectedPostDetails))
                });
            break;
    }

    return next(action)
}

const reducer = createReducer<State, RootAction>(initialState)
    .handleAction(a.onFetchingPostDetails, (state, action) => {
        const currentlySelectedPostDetailsIndex = state.data.findIndex(p => p.type === 'PostDetails');
        if(currentlySelectedPostDetailsIndex > -1){
            const postListCopy = state.data.map(p => p)
            const currentlySelectedPostDetails = state.data[currentlySelectedPostDetailsIndex]
            postListCopy[currentlySelectedPostDetailsIndex] = {
                ...currentlySelectedPostDetails,
                type: 'PostBasic'
            }
            return { data: postListCopy }
        }
        else
            return state;
    })
    .handleAction(a.onFetchedPostDetails, (state, action) => {

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

export {
    publicActions as postListActions,    
    middleware as postListMiddleware,
    reducer as postListReducer
}
export type PostListState = State