import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { PostCard } from './PostCard';
import { PostDetailsCard } from './PostDetailsCard';
import { usePostListLogic } from '../logic/postList';

const useStyles = makeStyles({
});

export function PostList(p: {className?: string}){
  const classes = useStyles()
  const { postList, onPostBasicClick } = usePostListLogic()
  return (
    <List className={p.className}>
      {postList.map(p => (
        <ListItem>
          {p.type === 'PostDetails' ?
            <PostDetailsCard post={p} raised /> :
            <PostCard onClick={() => onPostBasicClick(p.id)} post={p} />
          }
        </ListItem>
      ))}
    </List>
  )
}