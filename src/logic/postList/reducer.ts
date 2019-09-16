import { ActionType, createReducer } from 'typesafe-actions';
import { postBasicList } from '../../data';
import * as a from "./actions";
import { PostListState, PostDetailsFetchContext, PostBasic } from './types';
import produce from 'immer';

const initialState: PostListState = {
    data: postBasicList
}

type RootAction = ActionType<typeof import('./actions')>;

export const reducer = createReducer<PostListState, RootAction>(initialState)
    .handleAction(a.onFetchingPostDetails, (s, action) => produce(s, state => {        
        const currentlySelectedPostDetailsIndex = state.data.findIndex(p => p.type === 'PostDetailsFetchContext');
        if(currentlySelectedPostDetailsIndex > -1){
            const currentlySelectedPostDetails = state.data[currentlySelectedPostDetailsIndex] as PostDetailsFetchContext
            state.data[currentlySelectedPostDetailsIndex] = currentlySelectedPostDetails.basic
        }
        const postId = action.payload
        const selectedPostIndex = state.data.findIndex(p => p.type === 'PostBasic' && p.id == postId)
        state.data[selectedPostIndex] = {
            type: 'PostDetailsFetchContext',
            basic: state.data[selectedPostIndex] as PostBasic,
            details: undefined,
            status: 'fetching'
        }
    }))
    .handleAction(a.onFetchedPostDetails, (s, action) => produce(s, state => {
        const nextSelectedDetails = action.payload
        const postDetailsFetchContext = state.data.find(p => 
            p.type === 'PostDetailsFetchContext' && 
            p.status === 'fetching' &&
            p.basic.id === nextSelectedDetails.id
        );
        if(postDetailsFetchContext){
            const casted = postDetailsFetchContext as PostDetailsFetchContext
            casted.status = 'fetched'
            casted.details = nextSelectedDetails
        }
        else 
            throw new Error()
    }))