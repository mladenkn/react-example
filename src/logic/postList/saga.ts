import { takeEvery, put, call } from "@redux-saga/core/effects";
import * as a from "./actions";
import { PostDetails, PostBasic, UserDetails } from "./types";
import { fetchPostDetails, fetchPostBasicList, fetchUserDetails } from "./dataProviders";
import { postDetailsetchActions as postDetailSFetchActions, postListFetchActions, onUsernameClick, fetchUserActionActions } from "./actions";
 
function* onPostBasicClick(action: ReturnType<typeof a.onPostBasicSelect>){
    const postId = action.payload;    
    yield put(postDetailSFetchActions.request(postId));    
    let postDetails: PostDetails;    
    try {
        postDetails = yield call(fetchPostDetails, postId);
    }
    catch {
        yield put(postDetailSFetchActions.failure());
        return;
    }    
    yield put(postDetailSFetchActions.success(postDetails));
}

function* fetchPostList(){
    let posts: PostBasic[];
    try {
        posts = yield call(fetchPostBasicList);
    }
    catch {
        yield put(postListFetchActions.failure());
        return;
    }    
    yield put(postListFetchActions.success(posts!));
}

function* fetchUser(action: ReturnType<typeof onUsernameClick>){
    console.log(action)
    let postDetails: UserDetails;
    yield put(fetchUserActionActions.request(action.payload))
    try {
        postDetails = yield call(fetchUserDetails, action.payload);
    }
    catch {
        yield put(fetchUserActionActions.failure());
        return;
    }    
    yield put(fetchUserActionActions.success(postDetails));    
}

export function* postListSaga(){
    yield takeEvery(postListFetchActions.request, fetchPostList)
    yield takeEvery(a.onPostBasicSelect, onPostBasicClick)
    yield takeEvery(onUsernameClick, fetchUser)
}