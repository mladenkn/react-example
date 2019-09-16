import { ActionType, createReducer } from 'typesafe-actions';
import { postBasicList, PostBasic, PostDetails } from '../../data';
import * as a from "./actions";
import { State } from './shared';

const initialState: State = {
    data: postBasicList
}

type RootAction = ActionType<typeof import('./actions')>;

export const reducer = createReducer<State, RootAction>(initialState)
    .handleAction(a.onFetchingPostDetails, (state, action) => {
        const currentlySelectedPostDetailsIndex = state.data.findIndex(p => p.type === 'PostDetails');
        if(currentlySelectedPostDetailsIndex > -1){
            const postListCopy = state.data.map(p => p)
            const currentlySelectedPostDetails = state.data[currentlySelectedPostDetailsIndex]
            postListCopy[currentlySelectedPostDetailsIndex] = {
                ...currentlySelectedPostDetails,
                type: 'PostBasic'
            }
            return { data: postListCopy }
        }
        else
            return state;
    })
    .handleAction(a.onFetchedPostDetails, (state, action) => {
        const nextSelectedDetails = action.payload        
        const postListCopy = state.data.map(p => p)        
        const indexOfNextSelected = state.data.findIndex(p => p.id === nextSelectedDetails.id)        
        postListCopy[indexOfNextSelected] = nextSelectedDetails
        return {data: postListCopy}
    })