import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { HomeSection } from './HomeSection';
import { LoginSection, LoginFormInput } from './LoginForm';

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
      {!loginSucceeded && <LoginSectionContainer className={classes.loginForm} onSuccess={() => setLoginSucceeded(true)} />}
      {loginSucceeded && <HomeSection/>}
    </div>
  )
}

const tryLogin = createMockAuthenticator();

function LoginSectionContainer(p: {className?: string, onSuccess: () => void}){
  const [loginFailed, setLoginFailed] = useState(false);
  function onSubmit(i: LoginFormInput){
    if(tryLogin(i.username, i.password))
      p.onSuccess();
    else 
      setLoginFailed(true)
  }
  return <LoginSection className={p.className} loginFailed={loginFailed} onSubmit={onSubmit} />;
}

function createMockAuthenticator(){
  const acceptedUsernames = ['mate', 'jure', 'frane', 'mladen'];
  const acceptedPassword = 'sifra123';
  return function(username: string, password: string){
    return acceptedUsernames.includes(username) && password === acceptedPassword;
  }
}