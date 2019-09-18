import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { HomeSection } from './HomeSection';
import { LoginSection } from './LoginForm';

const useStyles = makeStyles({
  root: {
    padding: '0.6em 1em',
    width: '35em',
  },
  loginForm: {
    width: '55%',
  },
});

export function AppRoot(){
  const classes = useStyles()
  const [loginSucceeded, setLoginSucceeded] = useState(false);
  return (
    <div className={classes.root}>
      <LoginSection className={classes.loginForm} onSuccess={() => setLoginSucceeded(true)} />
      {loginSucceeded && <HomeSection/>}
    </div>
  )
}