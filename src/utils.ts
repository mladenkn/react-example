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