import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import { postListReducer, PostListState, postListSaga } from './postList'
import { combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from '@redux-saga/core'

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