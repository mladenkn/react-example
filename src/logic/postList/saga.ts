import { takeEvery, put, call } from "@redux-saga/core/effects";
import * as a from "./actions";
import { PostDetails, PostBasic } from "./types";
import { fetchPostDetails, fetchPostBasicList } from "./dataProviders";
import { postDetailsetchActions as postDetailSFetchActions, postListFetchActions } from "./actions";
 
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

export default function*(){
    yield takeEvery(postListFetchActions.request, fetchPostList)
    yield takeEvery(a.onPostBasicSelect, onPostBasicClick)
}