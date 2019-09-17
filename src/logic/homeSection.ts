import { PostListState } from "./postList/types";
import { createAsyncAction, createReducer, createAction, getType } from "typesafe-actions";
import { postListInitialState, postListActions as postListActions_, postListReducer, postListSaga } from "./postList";
import { FetchOf, fetchStateFactory } from "./fetchableState";
import produce from "immer";
import { takeEvery, call, put, fork } from "@redux-saga/core/effects";

export interface UserDetails {
    id: number
    name: string
}

export const onUsernameClick = createAction('homeSection/USERNAME_CLICK', p => (id: number) => p(id))
const fetchUserActionGroup = createAsyncAction(
    'homeSection/FETCH_USER_REQUEST',
    'homeSection/FETCH_USER_SUCCESS',
    'homeSection/FETCH_USER_FAILURE',
)<number, UserDetails, undefined>()

export interface HomeSectionState {
    posts: PostListState
    userDetails: FetchOf<UserDetails> & { userId?: number }
}

const initialState: HomeSectionState = {
    posts: postListInitialState,
    userDetails: fetchStateFactory.initial()
}

async function fetchUserDetails(id: number): Promise<UserDetails>{
    const user = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(r => r.json())
    return { id: user.id, name: user.name }
}

function* fetchUser(action: ReturnType<typeof onUsernameClick>){
    console.log(action)
    let postDetails: UserDetails;
    yield put(fetchUserActionGroup.request(action.payload))
    try {
        postDetails = yield call(fetchUserDetails, action.payload);
    }
    catch {
        yield put(fetchUserActionGroup.failure());
        return;
    }    
    yield put(fetchUserActionGroup.success(postDetails));    
}

export function* homeSectionSaga(){
    yield fork(postListSaga)
    yield takeEvery(onUsernameClick, fetchUser)
}

const reducer = createReducer(initialState)
    .handleAction(fetchUserActionGroup.request, (s, action) => produce(s, state => {
        console.log(action)
        state.userDetails = {...fetchStateFactory.onBegin(), userId: action.payload}
    }))
    .handleAction(fetchUserActionGroup.success, (s, action) => produce(s, state => {
        Object.assign(state.userDetails, fetchStateFactory.onComplete(action.payload))
    }))
    .handleAction(fetchUserActionGroup.failure, (s, action) => produce(s, state => {
        Object.assign(state.userDetails, fetchStateFactory.onFailure())
    }))
    ;
    
export function homeSectionReducer(state: HomeSectionState = initialState, action: any){
    const state1 = reducer(state, action);
    const postListState = postListReducer(state1.posts, action);
    return { ...state1, posts: postListState };
}