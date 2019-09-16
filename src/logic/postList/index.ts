import { State } from './shared';
export { reducer as postListReducer } from './reducer';
export { default as postListSaga } from './saga';
export { onPostBasicClick } from './actions';

export type PostListState = State;