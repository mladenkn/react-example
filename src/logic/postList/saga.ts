import { takeEvery, put, call } from "@redux-saga/core/effects";
import * as a from "./actions";
import { PostDetails } from "./types";
import { fetchPostDetails, fetchPostBasicList } from "./dataProviders";
 
function* onPostBasicClick(action: ReturnType<typeof a.onPostBasicClick>){
    const postId = action.payload;            
    yield put(a.onFetchingPostDetails(postId));
    const nextSelectedPostDetails: PostDetails = yield call(fetchPostDetails, postId)
    yield put(a.onFetchedPostDetails(nextSelectedPostDetails))
}

function* fetchPostList(){
    const posts = yield call(fetchPostBasicList)
    yield put(a.fetchPostListSuccess(posts))
}

export default function*(){
    yield takeEvery(a.fetchPostList, fetchPostList)
    yield takeEvery(a.onPostBasicClick, onPostBasicClick)
}