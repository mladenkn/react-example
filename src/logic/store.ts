import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import { combineReducers } from 'redux'
import createSagaMiddleware from '@redux-saga/core'
import { homeSectionReducer, HomeSectionState, homeSectionSaga } from './homeSection';

export interface AppState {
    homeSection: HomeSectionState
}

export function createStore(){

    const saga = createSagaMiddleware();

    const store =  configureStore({
        reducer: combineReducers<AppState>({
            homeSection: homeSectionReducer
        }),
        middleware: [...getDefaultMiddleware(), saga]
    })

    saga.run(homeSectionSaga)

    return store;
}