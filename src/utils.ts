export enum AsyncOperationStatus {
    NotInitiated='NotInitiated', Processing='Processing', Completed='Completed', Errored='Errored'
}

export function getRandomInt(min: number, max: number){
    return Math.floor(Math.random() * max) + min
}

export function getRandomArrayElement<T>(arr: T[]){
    const i = getRandomInt(0, arr.length)
    return arr[i]
}

export interface FetchOf<TWrapped> {
    data?: TWrapped
    status: AsyncOperationStatus
}

function createFetchableDataStateFactory(){ 

    const initial = { data: undefined, status: AsyncOperationStatus.NotInitiated }
    
    const begin = { data: undefined, status: AsyncOperationStatus.Processing }

    function complete<TData>(data: TData){
        return { data, status: AsyncOperationStatus.Completed }
    }

    const failure = { data: undefined, status: AsyncOperationStatus.Errored }

    return { initial, begin, complete, failure }
}

export const fetchStates = createFetchableDataStateFactory()