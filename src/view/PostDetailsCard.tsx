import React from 'react'
import { makeStyles } from "@material-ui/styles"
import { Card, List, ListItem, Typography, colors } from "@material-ui/core";
import { PostDetails, PostDetailsComment } from '../logic/postList/types'

const usePostDetailsCardStyles = makeStyles({
  root: {
    padding: '0.5em',
  },
  title: {
    fontSize: '1.3em',
    paddingLeft: '0.1em',
  },
  username: {
    fontSize: '0.8em',
    paddingLeft: '0.4em',
  },
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
    <Card raised={p.raised} className={classes.root}>
      <Typography className={classes.title}>{p.post.title}</Typography>
      <Typography className={classes.username}>{p.post.user.name}</Typography>
      <Typography className={classes.body}>{p.post.body}</Typography>
      <PostCommentList className={classes.commentList} comments={p.post.comments} />
    </Card>
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
          <Typography className={classes.username}>{c.user.name}</Typography>
          <Typography className={classes.body}>
            {c.body}
          </Typography>
        </ListItem>
      ))}
    </List>
  )
}