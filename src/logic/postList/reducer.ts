import { ActionType, createReducer } from 'typesafe-actions';
import * as a from "./actions";
import { PostListState, PostDetailsFetchContext, PostBasic } from './types';
import produce from 'immer';
import { findAndUpdate, AsyncOperationStatus } from '../../utils';

const initialState: PostListState = {
    data: undefined,
    status: AsyncOperationStatus.NotInitiated
}

type RootAction = ActionType<typeof import('./actions')>;

export const reducer = createReducer<PostListState, RootAction>(initialState)
    .handleAction(a.onFetchingPostDetails, (s, action) => produce(s, state => {        
        findAndUpdate(
            state.data!, 
            postContext => postContext.type === 'PostDetailsFetchContext',
            postContext => {
                const casted = postContext as PostDetailsFetchContext
                //take details as basic for the case when some data might have changed on backend
                return casted.status === 'fetched' ?
                    {...casted.details!, type: 'PostBasic'} as PostBasic :
                    casted.basic                    
            }
        )
        findAndUpdate(
            state.data!, 
            postContext => postContext.type === 'PostBasic' && postContext.id === action.payload,
            postContext => ({
                type: 'PostDetailsFetchContext',
                basic: postContext as PostBasic,
                details: undefined,
                status: 'fetching'
            } as PostDetailsFetchContext)
        )
    }))
    .handleAction(a.onFetchedPostDetails, (s, action) => produce(s, state => {
        const postDetails = action.payload
        findAndUpdate(
            state.data!,
            postContext => 
                postContext.type === 'PostDetailsFetchContext' && 
                postContext.status === 'fetching' &&
                postContext.basic.id === postDetails.id,
            postContext => {
                const casted = postContext as PostDetailsFetchContext
                casted.status = 'fetched'
                casted.details = postDetails
            }
        );        
    }))
    .handleAction(a.fetchPostListSuccess, (s, action) => produce(s, state => {
        state.status = AsyncOperationStatus.Completed
        state.data = action.payload
    }))
    .handleAction(a.fetchPostList, (s, action) => produce(s, state => {
        state.status = AsyncOperationStatus.Processing
    }))