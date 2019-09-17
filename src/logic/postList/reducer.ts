import { ActionType, createReducer } from 'typesafe-actions';
import * as a from "./actions";
import { PostListState } from './types';
import produce from 'immer';
import { createFetchableDataStateFactory } from '../fetchableState';

type RootAction = ActionType<typeof import('./actions')>;

const fetchStateFactory = createFetchableDataStateFactory();

const initialState: PostListState = {
    lastListFetch: fetchStateFactory.initial(),
    selectedPostId: undefined,
    lastDetailsFetch: fetchStateFactory.initial(),
}

export const reducer = createReducer<PostListState, RootAction>(initialState)
    .handleAction(a.onPostBasicClick, (s, action) => produce(s, state => {
        state.selectedPostId = action.payload
    })) 
    .handleAction(a.onFetchPostDetails, (s, action) => produce(s, state => {
        state.lastDetailsFetch = fetchStateFactory.onBegin()
    })) 
    .handleAction(a.onFetchPostDetailsSuccess, (s, action) => produce(s, state => {
        state.lastDetailsFetch = fetchStateFactory.onComplete(action.payload)
    }))
    .handleAction(a.fetchPostListSuccess, (s, action) => produce(s, state => {
        state.lastListFetch = fetchStateFactory.onComplete(action.payload)
    }))
    .handleAction(a.fetchPostListFailure, (s, action) => produce(s, state => {
        state.lastListFetch = fetchStateFactory.onFailure()
    }))
    .handleAction(a.fetchPostList, (s) => produce(s, state => {
        state.lastListFetch = fetchStateFactory.onBegin()
    }))