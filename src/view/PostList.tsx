import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { PostCard } from './PostCard';
import { PostDetailsCard } from './PostDetailsCard';
import { PostBasic, PostDetails } from '../data';
import { connect } from 'react-redux';
import { AppState } from '../logic/store';
import { postListActions } from '../logic/postList';

const useStyles = makeStyles({
});

interface Props {
  className?: string, 
  posts: (PostBasic | PostDetails)[]
  onPostBasicClick: (id: number) => void
}

export function PostList_(p: Props){
  const classes = useStyles()
  return (
    <List className={p.className}>
      {p.posts.map(post => (
        <ListItem key={post.id}>
          {post.type === 'PostDetails' ?
            <PostDetailsCard post={post} raised /> :
            <PostCard onClick={() => p.onPostBasicClick(post.id)} post={post} />
          }
        </ListItem>
      ))}
    </List>
  )
}

export const PostList = connect(
  (s: AppState) => ({}),
  { onPostBasicClick: postListActions.onPostBasicClick }
)(PostList_)