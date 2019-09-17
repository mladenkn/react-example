import { createAction, createAsyncAction } from "typesafe-actions";
import { PostBasic, PostDetails } from "./types";

export const onPostBasicClick = createAction('postList/onPostBasicClick', p => (id: number) => p(id));


export const onFetchPostDetails = createAction('postList/onFetchingPostDetails', 
    p => (postId: number) => p(postId));
export const onFetchPostDetailsSuccess = createAction('postList/setSelectedPost', 
    p => (nextSelectedDetails: PostDetails) => p(nextSelectedDetails)
);

export const fetchPostList = createAction('postList/fetchPostList')
export const fetchPostListSuccess = createAction('postList/fetchPostListSucces', 
    p => (postList: PostBasic[]) => p(postList))
export const fetchPostListFailure = createAction('postList/fetchPostListFailure')