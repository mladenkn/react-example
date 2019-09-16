export function findAndUpdate<T>(
    arr: T[], 
    shouldUpdate: (element: T) => boolean, 
    update: (oldElement: T) => T | void
){
    const elementIndex = arr.findIndex(shouldUpdate);
    const element = arr[elementIndex];
    if(element){
        const newElement = update(element)
        if(newElement)
            arr[elementIndex] = newElement;
    }
}

export enum AsyncOperationStatus {
    NotInitiated='NotInitiated', Processing='Processing', Completed='Completed', Errored='Errored'
}

export interface Fetchable<TWrapped> {
    data?: TWrapped
    status: AsyncOperationStatus
}

export function getRandomInt(min: number, max: number){
    return Math.floor(Math.random() * max) + min
}

export function getRandomArrayElement<T>(arr: T[]){
    const i = getRandomInt(0, arr.length)
    return arr[i]
}