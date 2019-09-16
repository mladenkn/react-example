import React from 'react';
import { PostList } from './PostList';
import { makeStyles } from '@material-ui/styles';
import { PostList as PostListData, selectPostList } from '../logic/postList';
import { connect } from 'react-redux';
import { AppState } from '../logic/store';

const useStyles = makeStyles({
  postList: {
    width: '35em',
  }
});

export function AppRoot_(p: {posts: PostListData}){
  const classes = useStyles()
  return (
    <div>
      <PostList className={classes.postList} posts={p.posts} />
    </div>
  )
}

export const AppRoot = connect(
  (s: AppState) => ({ posts: selectPostList(s.postList) }),
)(AppRoot_) 