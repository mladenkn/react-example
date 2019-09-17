import { AsyncOperationStatus } from "../utils";
import { createAction, createReducer } from "typesafe-actions";

const actionTypes = {
    onFetchBegin: 'fetchableData/onFetchBegin',
    onFetchComplete: 'fetchableData/onFetchComplete',
    onFetchFailure: 'fetchableData/onFetchFailure',
}

export function createFetchableDataModule<TData>(){  

    const actions = {
        onFetchBegin: createAction(actionTypes.onFetchBegin, p => (id: number) => p(id)),
        onFetchComplete: createAction(actionTypes.onFetchComplete, p => (u: TData) => p(u)),
        onFetchFailure: createAction(actionTypes.onFetchFailure, p => (id: number) => p(id)),
    }

    const initialState: FetchOf<TData> = {
        data: undefined,
        status: AsyncOperationStatus.NotInitiated
    }

    const reducer = createReducer(initialState)
        .handleAction(actions.onFetchBegin, () => 
            ({ data: undefined, status: AsyncOperationStatus.Processing })
        )
        .handleAction(actions.onFetchFailure, () => 
            ({ data: undefined, status: AsyncOperationStatus.Errored })
        )
        .handleAction(actions.onFetchComplete, (_, action) => 
            ({ data: action.payload, status: AsyncOperationStatus.Completed })
        )

    return { reducer, actions }
}

export interface FetchOf<TWrapped> {
    data?: TWrapped
    status: AsyncOperationStatus
}

function createFetchableDataStateFactory(){ 

    function initial(){
        return { data: undefined, status: AsyncOperationStatus.NotInitiated }
    }
    
    function onFetchBegin(){
        return { data: undefined, status: AsyncOperationStatus.Processing }
    }

    function onFetchComplete<TData>(data: TData){
        return { data, status: AsyncOperationStatus.Completed }
    }

    function onFetchFailure(){
        return { data: undefined, status: AsyncOperationStatus.Errored }
    }

    return { initial, onBegin: onFetchBegin, onComplete: onFetchComplete, onFailure: onFetchFailure }
}

export const fetchStateFactory = createFetchableDataStateFactory()