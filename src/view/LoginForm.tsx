import React, { useState } from "react";
import { TextField, Typography, colors, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
  },
  heading: {
    fontSize: '1.2em',
    color: colors.grey[600],
  },
  form: {
    marginTop: '0.5em',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '1em',
  },
  username: {
    marginBottom: '1em',
  },
  submitButton: {
    float: 'right',
    marginTop: '1em',
  },
});

function useLoginLogic(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return { username, setUsername, password, setPassword };
}

export function LoginSection(p: {className?: string, onSuccess: () => void}){
  const classes = useStyles();
  const logic = useLoginLogic();
  return <LoginSectionPresenter className={p.className} logic={logic} />;
}

export function LoginSectionPresenter(p: {className?: string, logic: ReturnType<typeof useLoginLogic>}){
  const classes = useStyles();
  return (
    <div className={clsx(p.className, classes.root)}>
      <Typography className={classes.heading}>Please login in</Typography>
      <div className={classes.form}>
        <TextField 
          className={classes.username} 
          label='Username' 
          onChange={e => p.logic.setUsername(e.target.value)}
          value={p.logic.username} 
        />
        <TextField 
          label='Password' 
          value={p.logic.password} 
          onChange={e => p.logic.setPassword(e.target.value)}
        />
      </div>
      <Button className={classes.submitButton} color='primary'>Submit</Button>
    </div>
  )
}