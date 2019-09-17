import { createAction, createAsyncAction } from "typesafe-actions";
import { PostBasic, PostDetails } from "./types";

export const onPostBasicClick = createAction('postList/onPostBasicClick', p => (id: number) => p(id));

export const postListFetchActions = createAsyncAction(
    'postList/FETCH_POST_LIST_REQUEST',
    'postList/FETCH_POST_LIST_SUCCES',
    'postList/FETCH_POST_LIST_FAILURE'
)<undefined, PostBasic[], undefined>();

export const postDetailsetchActions = createAsyncAction(
    'postList/FETCH_POST_DETAILS_REQUEST',
    'postList/FETCH_POST_DETAILS_SUCCES',
    'postList/FETCH_POST_DETAILS_FAILURE'
)<number, PostDetails, undefined>();