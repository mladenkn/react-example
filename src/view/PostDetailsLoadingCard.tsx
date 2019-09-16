import React from 'react'
import { makeStyles } from "@material-ui/styles"
import { Card, List, ListItem, Typography, colors, CircularProgress } from "@material-ui/core"
import { PostBasic } from '../logic/postList/types'

const usePostDetailsLoadingCardStyles = makeStyles({
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
  spinner: {
    margin: '0.5em'
  }
})

export function PostDetailsLoadingCard(p: {post: PostBasic, raised: boolean}){
  const classes = usePostDetailsLoadingCardStyles()
  return (
    <Card raised={p.raised} className={classes.root}>
      <Typography className={classes.title}>{p.post.title}</Typography>
      <Typography className={classes.username}>{p.post.user.name}</Typography>
      <CircularProgress className={classes.spinner} />
    </Card>
  )
}