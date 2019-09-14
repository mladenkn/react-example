import { makeStyles } from "@material-ui/styles"
import { Card, Typography, CardActionArea } from "@material-ui/core"
import React from "react"

const usePostCardStyles = makeStyles({
  root: {
    padding: '0.5em',
    fontSize: '1em',
  },
  title: {
    fontSize: '1.15em',
  },
  username: {
    fontSize: '0.8em',
    paddingLeft: '0.2em',
  },
})

export interface Post {
  title: string
  username: string
}

export function PostCard(p: {post: Post, onClick: () => void}){
  const classes = usePostCardStyles()
  return (
    <Card>
      <CardActionArea disableRipple onClick={p.onClick} className={classes.root}>
        <Typography className={classes.title}>{p.post.title}</Typography>
        <Typography className={classes.username}>{p.post.username}</Typography>
      </CardActionArea>
    </Card>
  )
}