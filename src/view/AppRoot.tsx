import React from 'react';
import { PostList } from './PostList';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  postList: {
    width: '35em',
  }
});

export function AppRoot(){
  const classes = useStyles()
  return (
    <div>
      <PostList className={classes.postList} />
    </div>
  )
}