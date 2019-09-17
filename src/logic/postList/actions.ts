import { createAction } from "typesafe-actions";
import { PostBasic, PostDetails } from "./types";

export const onPostBasicClick = createAction('postList/onPostBasicClick', p => (id: number) => p(id));


export const onFetchPostDetails = createAction('postList/onFetchPostDetails', 
    p => (postId: number) => p(postId));
export const onFetchPostDetailsSuccess = createAction('postList/onFetchPostDetailsSuccess', 
    p => (nextSelectedDetails: PostDetails) => p(nextSelectedDetails)
);
export const onFetchPostDetailsFailure = createAction('postList/onFetchPostDetailsFailure')

export const fetchPostList = createAction('postList/fetchPostList')
export const fetchPostListSuccess = createAction('postList/fetchPostListSucces', 
    p => (postList: PostBasic[]) => p(postList))
export const fetchPostListFailure = createAction('postList/fetchPostListFailure')