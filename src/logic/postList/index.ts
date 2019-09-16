import { State, PostList as PostList_ } from './shared';
export { reducer as postListReducer } from './reducer';
export { default as postListSaga } from './saga';
export { onPostBasicClick } from './actions';
export { selectPostList } from './selectors';

export type PostListState = State;
export type PostList = PostList_;