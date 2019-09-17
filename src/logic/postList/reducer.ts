import { ActionType, createReducer } from 'typesafe-actions';
import * as a from "./actions";
import { PostListState } from './types';
import produce from 'immer';
import { fetchStateFactory } from '../fetchableState';
import { postListFetchActions, postDetailsetchActions } from './actions';

type RootAction = ActionType<typeof import('./actions')>;

export const postListInitialState: PostListState = {
    lastListFetch: fetchStateFactory.initial(),
    selectedPostId: undefined,
    lastDetailsFetch: fetchStateFactory.initial(),
}

export const postListReducer = createReducer<PostListState, RootAction>(postListInitialState)
    .handleAction(a.onPostBasicSelect, (s, action) => produce(s, state => {
        state.selectedPostId = action.payload;
    })) 
    
    .handleAction(postListFetchActions.request, (s) => produce(s, state => {
        state.lastListFetch = fetchStateFactory.onBegin();
    }))
    .handleAction(postListFetchActions.success, (s, action) => produce(s, state => {
        state.lastListFetch = fetchStateFactory.onComplete(action.payload);
    }))
    .handleAction(postListFetchActions.failure, (s, action) => produce(s, state => {
        state.lastListFetch = fetchStateFactory.onFailure();
    }))
    
    .handleAction(postDetailsetchActions.request, (s, action) => produce(s, state => {
        state.lastDetailsFetch = fetchStateFactory.onBegin();
    })) 
    .handleAction(postDetailsetchActions.success, (s, action) => produce(s, state => {
        state.lastDetailsFetch = fetchStateFactory.onComplete(action.payload);
    }))
    .handleAction(postDetailsetchActions.failure, (s, action) => produce(s, state => {
        state.lastDetailsFetch = fetchStateFactory.onFailure();
    }))