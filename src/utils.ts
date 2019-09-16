import { createAction as createAction_ } from 'typesafe-actions';

type ArgumentTypes<T> = T extends (... args: infer U ) => infer R ? U: never;
type ReplaceReturnType<T, TNewReturn> = (...a: ArgumentTypes<T>) => TNewReturn;

type CreateAction = typeof createAction_
type CreateActionReturnType = ReturnType<CreateAction> & { type: string }
type CreateActionNew = ReplaceReturnType<CreateAction, CreateActionReturnType>
type CreateActionParams = Parameters<CreateAction>
type ActionCreator = CreateAction & { type: string }

export const createAction = ((...args: CreateActionParams) => {
    const actionCreator = createAction_(args as any) as any
    actionCreator.type = actionCreator.getType()
    return actionCreator
}) as CreateActionNew