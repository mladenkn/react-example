import { PostDetails, PostBasic, postBasicList, getPostDetails, getPostBasic } from "../data";
import { Middleware, } from "redux-starter-kit";
import { AppState } from "./store";
import { createReducer, ActionType, getType, createAction } from 'typesafe-actions';
import { fetchPostDetails, fetchPostBasic } from "./postListDataProviders";
import { takeEvery, put, call } from "@redux-saga/core/effects";

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

const actionTypes = {
    onPostBasicClick: 'postList/onPostBasicClick',
    onFetchingPostDetails: 'postList/onFetchingPostDetails',
    setSelectedPost: 'postList/setSelectedPost',
}

const publicActions = {
    onPostBasicClick: createAction(actionTypes.onPostBasicClick, p => (id: number) => p(id)),
}

const privateActions = {
    onFetchingPostDetails: createAction(actionTypes.onFetchingPostDetails, p => (postId: number) => p(postId)),
    onFetchedPostDetails: createAction(actionTypes.setSelectedPost, 
        p => (nextSelectedDetails: PostDetails) => p(nextSelectedDetails)
    ),
}

const a = { ...privateActions, ...publicActions }
type RootAction = ActionType<typeof a>
 
function* onPostBasicClick(action: ReturnType<typeof a.onPostBasicClick>){
    const postId = action.payload;            
    yield put(a.onFetchingPostDetails(postId));
    const nextSelectedPostDetails: PostDetails = yield call(fetchPostDetails, postId)
    yield put(a.onFetchedPostDetails(nextSelectedPostDetails))
}

function* saga(){
    yield takeEvery(actionTypes.onPostBasicClick, onPostBasicClick)
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
        const nextSelectedDetails = action.payload        
        const postListCopy = state.data.map(p => p)        
        const indexOfNextSelected = state.data.findIndex(p => p.id === nextSelectedDetails.id)        
        postListCopy[indexOfNextSelected] = nextSelectedDetails
        return {data: postListCopy}
    })

export {
    publicActions as postListActions,    
    // middleware as postListMiddleware,
    reducer as postListReducer,
    saga as postListSaga
}
export type PostListState = State