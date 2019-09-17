import { createAction, createAsyncAction } from "typesafe-actions";
import { PostBasic, PostDetails } from "./types";

export const onPostBasicSelect = createAction('postList/ON_POST_BASIC_SELECT', p => (id: number) => p(id));

export const postListFetchActions = createAsyncAction(
    'postList/FETCH_POST_LIST_REQUEST',
    'postList/FETCH_POST_LIST_SUCCESS',
    'postList/FETCH_POST_LIST_FAILURE'
)<undefined, PostBasic[], undefined>();

export const postDetailsetchActions = createAsyncAction(
    'postList/FETCH_POST_DETAILS_REQUEST',
    'postList/FETCH_POST_DETAILS_SUCCESS',
    'postList/FETCH_POST_DETAILS_FAILURE'
)<number, PostDetails, undefined>();