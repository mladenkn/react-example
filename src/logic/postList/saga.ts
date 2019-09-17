import { takeEvery, put, call } from "@redux-saga/core/effects";
import * as a from "./actions";
import { PostDetails, PostBasic, UserDetails } from "./types";
import { fetchPostDetails, fetchPostBasicList, fetchUserDetails } from "./dataProviders";
import { postDetailsetchActions as postDetailSFetchActions, postListFetchActions, fetchUserActions } from "./actions";
 
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

function* fetchUser(action: ReturnType<typeof fetchUserActions.request>){
    let postDetails: UserDetails;
    try {
        postDetails = yield call(fetchUserDetails, action.payload.userId);
    }
    catch {
        yield put(fetchUserActions.failure());
        return;
    }    
    yield put(fetchUserActions.success(postDetails));    
}

export function* postListSaga(){
    yield takeEvery(postListFetchActions.request, fetchPostList)
    yield takeEvery(a.onPostBasicSelect, onPostBasicClick)
    yield takeEvery(fetchUserActions.request, fetchUser)
}