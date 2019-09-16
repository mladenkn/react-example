import React from 'react';
import { makeStyles, Link, ButtonBase } from "@material-ui/core";

const useStyles = makeStyles({
  root: {

  },
})

interface Props {
  className?: string
  name: string
  onClick?: () => void  
}

export function Username(p: Props){
  const classes = useStyles()
  return <Link className={p.className} component={ButtonBase}>{p.name}</Link>
}