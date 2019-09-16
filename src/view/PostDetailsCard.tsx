import React from 'react'
import { makeStyles } from "@material-ui/styles"
import { Card, List, ListItem, Typography, colors } from "@material-ui/core";
import { PostDetails, PostDetailsComment } from '../logic/postList/types'
import { PostCard } from './PostCard';
import { Username } from './Username';

const usePostDetailsCardStyles = makeStyles({
  body: {
    marginTop: '0.5em',
  },
  commentList: {
    width: '85%',
    marginLeft: 'auto',
    fontSize: '0.92em',
  },
})

export function PostDetailsCard(p: {post: PostDetails, raised: boolean}){
  const classes = usePostDetailsCardStyles()
  return (
    <PostCard post={p.post}>
      <Typography className={classes.body}>{p.post.body}</Typography>
      <PostCommentList className={classes.commentList} comments={p.post.comments} />
    </PostCard>
  )
}

const usePostCommentListStyles = makeStyles({
  listItem: {
    backgroundColor: colors.grey[100],
    margin: '1em 0',
    padding: '0.5em',
    borderRadius: '1em',
    display: 'block',
  },
  username: {
    fontSize: '1em',
    display: 'block',
  },
  body: {
    fontSize: '1em',
  },
})

function PostCommentList(p: {className?: string, comments: PostDetailsComment[]}){
  const classes = usePostCommentListStyles()
  return (
    <List disablePadding className={p.className}>
      {p.comments.map(c => (
        <ListItem key={c.id} disableGutters className={classes.listItem}>
          <Username className={classes.username} name={c.user.name} />
          <Typography className={classes.body}>
            {c.body}
          </Typography>
        </ListItem>
      ))}
    </List>
  )
}