import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import { combineReducers } from 'redux'
import createSagaMiddleware from '@redux-saga/core'
import { PostListState } from './postList/types';
import { postListReducer } from './postList/reducer';
import { postListSaga } from './postList/saga';

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