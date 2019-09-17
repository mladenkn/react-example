import React from 'react'
import { makeStyles } from "@material-ui/styles"
import { CircularProgress } from "@material-ui/core"
import { PostBasic } from '../logic/postList/types'
import { PostCard } from './PostCard'

const usePostDetailsLoadingCardStyles = makeStyles({
  spinner: {
    margin: '0.5em'
  }
})

export function PostDetailsLoadingCard(p: {post: PostBasic, raised: boolean}){
  const classes = usePostDetailsLoadingCardStyles()
  return (
    <PostCard post={p.post}>
      <CircularProgress className={classes.spinner} />
    </PostCard>
  )
}