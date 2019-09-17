import { createAction, createAsyncAction } from "typesafe-actions";
import { PostBasic, PostDetails, UserDetails } from "./types";

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


export const onUsernameClick = createAction('homeSection/USERNAME_CLICK', p => (id: number) => p(id))

export const fetchUserActions = createAsyncAction(
    'homeSection/FETCH_USER_REQUEST',
    'homeSection/FETCH_USER_SUCCESS',
    'homeSection/FETCH_USER_FAILURE',
)<{clientId: string, userId: number}, UserDetails, undefined>();