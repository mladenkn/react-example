import React, { useState } from 'react';
import { List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { PostCard } from './PostCard';
import { PostDetailsCard } from './PostDetailsCard';
import { PostBasic, PostDetails, getPostDetails } from '../data';

const useStyles = makeStyles({
});

const useLogic = () => {
  const [activeItemId, setActiveItemId] = useState<number | undefined>(undefined);
  return { activeItemId, setActiveItemId }
}

export function PostList(p: {className?: string, posts: (PostBasic | PostDetails)[]}){
  const classes = useStyles()
  const { activeItemId, setActiveItemId } = useLogic()
  return (
    <List className={p.className}>
      {p.posts.map(p => (
        <ListItem>
          {p.id === activeItemId ?
            <PostDetailsCard post={getPostDetails(p.id)!} raised /> :
            <PostCard onClick={() => setActiveItemId(p.id)} post={p as PostBasic} />
          }
        </ListItem>
      ))}
    </List>
  )
}