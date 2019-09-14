import React from 'react'
import { makeStyles } from "@material-ui/styles"
import { Card, List, ListItem, Typography, colors } from "@material-ui/core"

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

export interface Comment {
  username: string
  body: string
}

export interface Post {
  title: string
  username: string
  body: string
  comments: Comment[]
}

export function PostDetailsCard(p: {post: Post, raised: boolean}){
  const classes = usePostDetailsCardStyles()
  return (
    <Card raised={p.raised} className={classes.root}>
      <Typography className={classes.title}>{p.post.title}</Typography>
      <Typography className={classes.username}>{p.post.username}</Typography>
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
  },
  username: {
    fontSize: '1em',
  },
  body: {
    fontSize: '1em',
  },
})

function PostCommentList(p: {className?: string, comments: Comment[]}){
  const classes = usePostCommentListStyles()
  return (
    <List disablePadding className={p.className}>
      {p.comments.map(c => (
        <ListItem disableGutters className={classes.listItem}>
          <Typography className={classes.body}>
            <Typography className={classes.username}>{c.username}</Typography>
            {c.body}
          </Typography>
        </ListItem>
      ))}
    </List>
  )
}