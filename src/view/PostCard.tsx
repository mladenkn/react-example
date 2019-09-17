import { makeStyles } from "@material-ui/styles"
import { Card, Typography, CardActionArea } from "@material-ui/core"
import React, { Fragment } from "react"
import { PostBasic } from '../logic/postList/types'
import { Username } from "./Username"

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
    display: 'block',
  },
})

interface Props {
  post: Omit<PostBasic, 'type'>, 
  clickable?: boolean
  onClick?: () => void
  children?: JSX.Element | JSX.Element[]
}

export function PostCard(p: Props){
  const classes = usePostCardStyles()

  const content = (
    <Fragment>
      <Typography className={classes.title}>{p.post.title}</Typography>
      <Username id={p.post.id.toString()} showDetailsOnClick user={p.post.user} className={classes.username} />
      {p.children}
    </Fragment>
  );

  return (
    <Card>
      {p.clickable ?
        <CardActionArea disableRipple onClick={p.onClick} className={classes.root}>
          {content}
        </CardActionArea> : 
        <div className={classes.root}>
          {content}
        </div>
      }
    </Card>
  )
}