import { ActionType, createReducer } from 'typesafe-actions';
import * as a from "./actions";
import { PostListState } from './types';
import produce from 'immer';
import { fetchStates } from '../../utils';
import { postListFetchActions, postDetailsetchActions, fetchUserActions } from './actions';

type RootAction = ActionType<typeof import('./actions')>;

export const postListInitialState: PostListState = {
    lastListFetch: fetchStates.initial,
    selectedPostId: undefined,
    lastDetailsFetch: fetchStates.initial,
    lastUserDetailsFetch: fetchStates.initial,
}

export const postListReducer = createReducer<PostListState, RootAction>(postListInitialState)
    .handleAction(a.onPostBasicSelect, (s, action) => produce(s, state => {
        state.selectedPostId = action.payload;
    })) 
    
    .handleAction(postListFetchActions.request, (s) => produce(s, state => {
        state.lastListFetch = fetchStates.begin;
    }))
    .handleAction(postListFetchActions.success, (s, action) => produce(s, state => {
        console.log(action.payload)
        state.lastListFetch = fetchStates.complete(action.payload);
    }))
    .handleAction(postListFetchActions.failure, (s, action) => produce(s, state => {
        state.lastListFetch = fetchStates.failure;
    }))
    
    .handleAction(postDetailsetchActions.request, (s, action) => produce(s, state => {
        state.lastDetailsFetch = fetchStates.begin;
    })) 
    .handleAction(postDetailsetchActions.success, (s, action) => produce(s, state => {
        state.lastDetailsFetch = fetchStates.complete(action.payload);
    }))
    .handleAction(postDetailsetchActions.failure, (s, action) => produce(s, state => {
        state.lastDetailsFetch = fetchStates.failure;
    }))
    
    // it may be better to this in some container component to avoid clientId
    .handleAction(fetchUserActions.request, (s, action) => produce(s, state => {
        console.log(action)
        state.lastUserDetailsFetch = {...fetchStates.begin, clientId: action.payload.clientId}
    }))
    .handleAction(fetchUserActions.success, (s, action) => produce(s, state => {
        Object.assign(state.lastUserDetailsFetch, fetchStates.complete(action.payload))
    }))
    .handleAction(fetchUserActions.failure, (s, action) => produce(s, state => {
        Object.assign(state.lastUserDetailsFetch, fetchStates.failure)
    }))
    ;