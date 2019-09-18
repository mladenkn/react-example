import React from 'react'
import { makeStyles } from "@material-ui/styles"
import { List, ListItem, Typography, colors } from "@material-ui/core";
import { PostDetails, PostDetailsComment } from '../logic/postList/types'
import { PostCard } from './PostCard';
import { Username, UsernameProps } from './Username';

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

export function PostDetailsCard(p: {post: PostDetails, raised: boolean, usernameProps?: Partial<UsernameProps>}){
  const classes = usePostDetailsCardStyles()
  return (
    <PostCard usernameProps={p.usernameProps} post={p.post}>
      <Typography className={classes.body}>{p.post.body}</Typography>
      <PostCommentList usernameProps={p.usernameProps} className={classes.commentList} postId={p.post.id} comments={p.post.comments} />
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

function PostCommentList(p: {className?: string, postId: number, comments: PostDetailsComment[], usernameProps?: Partial<UsernameProps>}){
  const classes = usePostCommentListStyles()
  return (
    <List disablePadding className={p.className}>
      {p.comments.map(c => (
        <ListItem key={c.id} disableGutters className={classes.listItem}>
          <Username {...p.usernameProps} id={`${p.postId}.${c.id}`} className={classes.username} user={c.user} />
          <Typography className={classes.body}>
            {c.body}
          </Typography>
        </ListItem>
      ))}
    </List>
  )
}