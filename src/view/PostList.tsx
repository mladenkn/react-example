import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { PostCard } from './PostCard';
import { PostDetailsCard } from './PostDetailsCard';
import { PostBasic, PostDetails } from '../data';
import { connect } from 'react-redux';
import { AppState } from '../logic/store';
import { onPostBasicClick, } from '../logic/postList';
import { PostList as PostListData, PostListState } from '../logic/postList/types';
import { PostDetailsLoadingCard } from './PostDetailsLoadingCard';
import { PostDetailsFetchContext } from '../logic/postList/types';
 
const useStyles = makeStyles({
});

interface Props {
  className?: string, 
  state: PostListState
  onPostBasicClick: (id: number) => void
}

export function PostList_(p: Props){
  const classes = useStyles()

  function renderPost(postContext: PostBasic | PostDetailsFetchContext){
    if(postContext.type === 'PostBasic')
      return (
        <ListItem key={postContext.id}>
          <PostCard onClick={() => p.onPostBasicClick(postContext.id)} post={postContext} />
        </ListItem>
      )
    else {
      if(postContext.status === 'fetching')
        return (
          <ListItem key={postContext.basic.id}>
            <PostDetailsLoadingCard post={postContext.basic} raised />
          </ListItem>
        )
      else
        return (
          <ListItem key={postContext.basic.id}>
            <PostDetailsCard post={postContext.details!} raised />
          </ListItem>
        )
    }
  }

  return (
    <List className={p.className}>
      {p.state.data.map(renderPost)}
    </List>
  )
}

export const PostList = connect(
  (s: AppState) => ({ state: s.postList }),
  { onPostBasicClick }
)(PostList_)