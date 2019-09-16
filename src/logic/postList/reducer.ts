import { ActionType, createReducer } from 'typesafe-actions';
import { postBasicList } from '../../data';
import * as a from "./actions";
import { PostListState, PostDetailsFetchContext, PostBasic } from './types';
import produce from 'immer';
import { findAndUpdate } from '../../utils';

const initialState: PostListState = {
    data: postBasicList
}

type RootAction = ActionType<typeof import('./actions')>;

export const reducer = createReducer<PostListState, RootAction>(initialState)
    .handleAction(a.onFetchingPostDetails, (s, action) => produce(s, state => {
        
        findAndUpdate(
            state.data, 
            postContext => postContext.type === 'PostDetailsFetchContext',
            postContext => (postContext as PostDetailsFetchContext).basic
        )
        const postId = action.payload

        findAndUpdate(
            state.data, 
            postContext => postContext.type === 'PostBasic' && postContext.id == postId,
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
            state.data,
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