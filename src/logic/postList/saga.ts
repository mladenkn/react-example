import { takeEvery, put, call } from "@redux-saga/core/effects";
import * as a from "./actions";
import { PostDetails, PostBasic } from "./types";
import { fetchPostDetails, fetchPostBasicList } from "./dataProviders";
 
function* onPostBasicClick(action: ReturnType<typeof a.onPostBasicClick>){
    const postId = action.payload;
    
    yield put(a.onFetchPostDetails(postId));
    
    let postDetails: PostDetails;
    
    try {
        postDetails = yield call(fetchPostDetails, postId);
    }
    catch {
        yield put(a.onFetchPostDetailsFailure());
        return;
    }
    
    yield put(a.onFetchPostDetailsSuccess(postDetails!));
}

function* fetchPostList(){
    let posts: PostBasic[];
    try {
        posts = yield call(fetchPostBasicList);
    }
    catch {
        yield put(a.fetchPostListFailure());
        return;
    }    
    yield put(a.fetchPostListSuccess(posts!));
}

export default function*(){
    yield takeEvery(a.fetchPostList, fetchPostList)
    yield takeEvery(a.onPostBasicClick, onPostBasicClick)
}