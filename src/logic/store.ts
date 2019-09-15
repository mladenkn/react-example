import { configureStore } from 'redux-starter-kit'
import { postListReducer, PostListState } from './postList'
import { combineReducers } from 'redux'

export interface AppState {
    postList: PostListState
}

export function createStore(){
    return configureStore({
        reducer: combineReducers<AppState>({
            postList: postListReducer
        })
    })
}