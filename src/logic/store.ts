import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import { postListReducer, postListSaga } from './postList'
import { combineReducers } from 'redux'
import createSagaMiddleware from '@redux-saga/core'
import { PostListState } from './postList/types';

export interface AppState {
    postList: PostListState
}

export function createStore(){

    const saga = createSagaMiddleware();

    const store =  configureStore({
        reducer: combineReducers<AppState>({
            postList: postListReducer
        }),
        middleware: [...getDefaultMiddleware(), saga]
    })

    saga.run(postListSaga)

    return store;
}