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
 
const useStyles = makeStyles({

});

interface ContainerProps {
  className?: string, 
  posts: PostListViewData, 
  onPostBasicClick: (id: number) => void
  fetchPostList: () => void
}

export const PostList = 
  connect((state: AppState) => ({posts: selectPostListViewData(state.postList)}), {onPostBasicClick, fetchPostList})
  ((p: ContainerProps) => {
    useEffect(() => {
      p.fetchPostList()
    }, [])

    switch(p.posts.status){
      case AsyncOperationStatus.Processing:
        return <PostListLoading />  
      case AsyncOperationStatus.NotInitiated:
        return <PostListLoading />
      case AsyncOperationStatus.Errored:
        return <div>No connection</div>
      case AsyncOperationStatus.Completed:
        return (
          <PostListPresenter 
            className={p.className} 
            data={p.posts.data!} 
            onPostBasicClick={p.onPostBasicClick}
          />
        )
      default:
        return <div />
    }
  });

// export const PostList = connect(
//   (state: AppState) => ({ data: selectPostListViewData(state.postList) }),
//   { onPostBasicClick }
// )(PostListPresenter)

interface Props {
  className?: string, 
  data: (PostBasic | PostDetailsFetchContext)[]
  onPostBasicClick: (id: number) => void
}

export function PostListPresenter(p: Props){
  const classes = useStyles()

  function renderPost(postContext: PostBasic | PostDetailsFetchContext){
    if(postContext.type === 'PostBasic')
      return (
        <ListItem key={postContext.id}>
          <PostCard clickable onClick={() => p.onPostBasicClick(postContext.id)} post={postContext} />
        </ListItem>
      )
    else {
      if(postContext.status === AsyncOperationStatus.Processing)
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
      {p.data.map(renderPost)}
    </List>
  )
}

const usePostListLoadingStyles = makeStyles({
  root: {
    padding: '1em',
  },
  spinner: {
    marginTop: '1em',
    marignLeft: '0.3em',
  },
})

export function PostListLoading(){
  const classes = usePostListLoadingStyles()
  return (
    <div className={classes.root}>
      <Typography>Loading posts...</Typography>
      <CircularProgress className={classes.spinner} />
    </div>
  )
}