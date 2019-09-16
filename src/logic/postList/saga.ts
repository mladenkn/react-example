import { takeEvery, put, call } from "@redux-saga/core/effects";
import * as a from "./actions";
import { actionTypes } from "./actions";
import { PostDetails } from "../../data";
import { fetchPostDetails } from "./dataProviders";

 
function* onPostBasicClick(action: ReturnType<typeof a.onPostBasicClick>){
    const postId = action.payload;            
    yield put(a.onFetchingPostDetails(postId));
    const nextSelectedPostDetails: PostDetails = yield call(fetchPostDetails, postId)
    yield put(a.onFetchedPostDetails(nextSelectedPostDetails))
}

export default function*(){
    yield takeEvery(actionTypes.onPostBasicClick, onPostBasicClick)
}