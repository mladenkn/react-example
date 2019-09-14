import { makeStyles } from "@material-ui/styles"
import { Card, Typography } from "@material-ui/core"
import React from "react"

const usePostCardStyles = makeStyles({
  root: {
    padding: '0.5em',
  },
  title: {
    fontSize: '1.15em',
  },
  username: {
    fontSize: '0.8em',
    paddingLeft: '0.2em',
  },
})

export function PostCard(p: {post: any}){
  const classes = usePostCardStyles()
  return (
    <Card className={classes.root}>
      <Typography className={classes.title}>{p.post.title}</Typography>
      <Typography className={classes.username}>{p.post.user.name}</Typography>
    </Card>
  )
}