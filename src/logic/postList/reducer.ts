import { ActionType, createReducer } from 'typesafe-actions';
import * as a from "./actions";
import { PostListState, PostDetailsFetchContext, PostBasic, PostListViewData } from './types';
import produce from 'immer';
import { findAndUpdate, AsyncOperationStatus } from '../../utils';
import { createFetchableDataStateFactory } from '../fetchableState';

type RootAction = ActionType<typeof import('./actions')>;

const fetchStateFactory = createFetchableDataStateFactory();

const initialState: PostListState = {
    lastListFetch: fetchStateFactory.initial(),
    selectedPostId: undefined,
    lastDetailsFetch: fetchStateFactory.initial(),
}

export const reducer = createReducer<PostListState, RootAction>(initialState)
    // .handleAction(a.onFetchPostDetails, (s, action) => produce(s, state => {        
    //     findAndUpdate(
    //         state.data!, 
    //         postContext => postContext.type === 'PostDetailsFetchContext',
    //         postContext => {
    //             const casted = postContext as PostDetailsFetchContext
    //             //take details as basic for the case when some data might have changed on backend
    //             return casted.status === AsyncOperationStatus.Completed ?
    //                 {...casted.details!, type: 'PostBasic'} as PostBasic :
    //                 casted.basic                    
    //         }
    //     )
    //     findAndUpdate(
    //         state.data!, 
    //         postContext => postContext.type === 'PostBasic' && postContext.id === action.payload,
    //         postContext => ({
    //             type: 'PostDetailsFetchContext',
    //             basic: postContext as PostBasic,
    //             details: undefined,
    //             status: AsyncOperationStatus.Processing
    //         } as PostDetailsFetchContext)
    //     )
    // })) 
    // .handleAction(a.onFetchPostDetailsSuccess, (s, action) => produce(s, state => {
    //     const postDetails = action.payload
    //     findAndUpdate(
    //         state.data!,
    //         postContext => 
    //             postContext.type === 'PostDetailsFetchContext' && 
    //             postContext.status === AsyncOperationStatus.Processing &&
    //             postContext.basic.id === postDetails.id,
    //         postContext => {
    //             const casted = postContext as PostDetailsFetchContext
    //             casted.status = AsyncOperationStatus.Completed
    //             casted.details = postDetails
    //         }
    //     );
    // }))
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
    .handleAction(a.fetchPostListFailure, (s,) => produce(s, state => {
        state.lastListFetch = fetchStateFactory.onFailure()
    }))
    .handleAction(a.fetchPostList, (s) => produce(s, state => {
        state.lastListFetch = fetchStateFactory.onBegin()
    }))