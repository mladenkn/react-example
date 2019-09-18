import React from "react";
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
  failureMessage: {
    marginTop: '3em',
    marginLeft: '1.1em',
    color: colors.red[800]
  },
});

export interface LoginFormInput {
  username: string
  password: string
}

function useState(){
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const input = { username, password }
  return { input, setUsername, setPassword };
}

interface Props {
  className?: string, 
  onSubmit: (input: LoginFormInput) => void,
  loginFailed: boolean
}

export function LoginSection(p: Props){
  const classes = useStyles();
  const state = useState();
  return (
    <div className={clsx(p.className, classes.root)}>
      <Typography className={classes.heading}>Please login in</Typography>
      <div className={classes.form}>
        <TextField 
          className={classes.username} 
          label='Username' 
          value={state.input.username} 
          onChange={e => state.setUsername(e.target.value)}
        />
        <TextField 
          label='Password' 
          value={state.input.password} 
          onChange={e => state.setPassword(e.target.value)}
        />
      </div>
      <Button 
        className={classes.submitButton}
        onClick={() => p.onSubmit(state.input)} 
        color='primary'
      >
          Submit
      </Button>
      {p.loginFailed &&
        <Typography className={classes.failureMessage}>Login Failed</Typography>        
      }
    </div>
  )
}