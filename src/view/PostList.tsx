import React, { useEffect } from 'react';
import { List, ListItem, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { PostCard } from './PostCard';
import { PostDetailsCard } from './PostDetailsCard';
import { PostBasic } from '../logic/postList/types'
import { connect } from 'react-redux';
import { AppState } from '../logic/store';
import { onPostBasicClick, fetchPostList } from '../logic/postList';
import { PostListViewData } from '../logic/postList/types';
import { PostDetailsLoadingCard } from './PostDetailsLoadingCard';
import { PostDetailsFetchContext } from '../logic/postList/types';
import { AsyncOperationStatus } from '../utils';
import { selectPostListViewData } from '../logic/postList';

export const PostList = connect(
  (state: AppState) => ({ postList: selectPostListViewData(state.postList) }),
  { onPostBasicClick, fetchPostList }
)(PostListPresenter)

interface Props {
  className?: string, 
  postList: PostListViewData
  onPostBasicClick: (id: number) => void
  fetchPostList: () => void
}

export function PostListPresenter(p: Props){

  function renderPost(postContext: PostBasic | PostDetailsFetchContext){
    if(postContext.type === 'PostBasic')
      return (
        <ListItem disableGutters key={postContext.id}>
          <PostCard clickable onClick={() => p.onPostBasicClick(postContext.id)} post={postContext} />
        </ListItem>
      )
    else {
      if(postContext.status === AsyncOperationStatus.Processing)
        return (
          <ListItem disableGutters key={postContext.basic.id}>
            <PostDetailsLoadingCard post={postContext.basic} raised />
          </ListItem>
        )
      else
        return (
          <ListItem disableGutters key={postContext.basic.id}>
            <PostDetailsCard post={postContext.details!} raised />
          </ListItem>
        )
    }
  }

  useEffect(() => {
    p.fetchPostList()
  }, [])

  switch(p.postList.status){

    case AsyncOperationStatus.Processing:
      return <PostListLoading className={p.className} />  
    
    case AsyncOperationStatus.NotInitiated:
      return <PostListLoading className={p.className} />
    
    case AsyncOperationStatus.Errored:
      return <div className={p.className}>No network connection</div>
    
    case AsyncOperationStatus.Completed:
      return (
        <List disablePadding className={p.className}>
          {p.postList.data!.map(renderPost)}
        </List>
      )
    
    default:    
      throw new Error('unpredicted case')
  }
}

const usePostListLoadingStyles = makeStyles({
  spinner: {
    marginTop: '1em',
    marignLeft: '0.3em',
  },
})

export function PostListLoading(p: {className?: string}){
  const classes = usePostListLoadingStyles()
  return (
    <div className={p.className}>
      <Typography>Loading posts...</Typography>
      <CircularProgress className={classes.spinner} />
    </div>
  )
}