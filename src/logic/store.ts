import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import { postListReducer, PostListState, postListMiddleware } from './postList'
import { combineReducers } from 'redux'

export interface AppState {
    postList: PostListState
}

export function createStore(){
    return configureStore({
        reducer: combineReducers<AppState>({
            postList: postListReducer
        }),
        middleware: [...getDefaultMiddleware(), postListMiddleware]
    })
}