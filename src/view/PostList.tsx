import React, { useState } from 'react';
import { List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { PostCard } from './PostCard';
import { PostDetailsCard, Post as PostDetailsCardPost } from './PostDetailsCard';

const useStyles = makeStyles({
});

const useLogic = () => {
  const [activeItemId, setActiveItemId] = useState<number | undefined>(undefined);
  return { activeItemId, setActiveItemId }
}

type Post = PostDetailsCardPost & {id: number}

export function PostList(p: {className?: string, posts: Post[]}){
  const classes = useStyles()
  const { activeItemId, setActiveItemId } = useLogic()
  return (
    <List className={p.className}>
      {p.posts.map(p => (
        <ListItem>
          {p.id === activeItemId ?
            <PostDetailsCard post={p} raised /> :
            <PostCard onClick={() => setActiveItemId(p.id)} post={p} />
          }
        </ListItem>
      ))}
    </List>
  )
}