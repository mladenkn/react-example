import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { HomeSection } from './HomeSection';

const useStyles = makeStyles({
  homeSection: {
    padding: '0.6em 1em',
    width: '35em',
  }
});

export function AppRoot(){
  const classes = useStyles()
  return (
    <div>
      <HomeSection className={classes.homeSection}/>
    </div>
  )
}