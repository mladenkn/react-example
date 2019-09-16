import { createAction } from "typesafe-actions";
import { PostDetails } from "../../data";

export const actionTypes = {
    onPostBasicClick: 'postList/onPostBasicClick',
    onFetchingPostDetails: 'postList/onFetchingPostDetails',
    setSelectedPost: 'postList/setSelectedPost',
}

export const onPostBasicClick = createAction(actionTypes.onPostBasicClick, p => (id: number) => p(id));
export const onFetchingPostDetails = createAction(actionTypes.onFetchingPostDetails, p => (postId: number) => p(postId));
export const onFetchedPostDetails = createAction(actionTypes.setSelectedPost, 
    p => (nextSelectedDetails: PostDetails) => p(nextSelectedDetails)
);