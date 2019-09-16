import { createAction } from "typesafe-actions";
import { PostBasic, PostDetails } from "./types";

export const actionTypes = {
    onPostBasicClick: 'postList/onPostBasicClick',
    onFetchingPostDetails: 'postList/onFetchingPostDetails',
    setSelectedPost: 'postList/setSelectedPost',
    fetchPostList: 'postList/fetchPostList',
    fetchPostListSuccess: 'postList/fetchPostListSucces',
}

export const onPostBasicClick = createAction(actionTypes.onPostBasicClick, p => (id: number) => p(id));



export const onFetchingPostDetails = createAction(actionTypes.onFetchingPostDetails, 
    p => (postId: number) => p(postId));
export const onFetchedPostDetails = createAction(actionTypes.setSelectedPost, 
    p => (nextSelectedDetails: PostDetails) => p(nextSelectedDetails)
);

export const fetchPostList = createAction(actionTypes.fetchPostList)
export const fetchPostListSuccess = createAction(actionTypes.fetchPostListSuccess, 
    p => (postList: PostBasic[]) => p(postList))
