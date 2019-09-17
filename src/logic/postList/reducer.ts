import { ActionType, createReducer } from 'typesafe-actions';
import * as a from "./actions";
import { PostListState } from './types';
import produce from 'immer';
import { createFetchableDataStateFactory } from '../fetchableState';
import { postListFetchActions, postDetailsetchActions } from './actions';

type RootAction = ActionType<typeof import('./actions')>;

const fetchStateFactory = createFetchableDataStateFactory();

const initialState: PostListState = {
    lastListFetch: fetchStateFactory.initial(),
    selectedPostId: undefined,
    lastDetailsFetch: fetchStateFactory.initial(),
}

export const reducer = createReducer<PostListState, RootAction>(initialState)
    .handleAction(a.onPostBasicClick, (s, action) => produce(s, state => {
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