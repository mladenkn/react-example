import React from "react";
import { TextField, Typography, colors, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from 'clsx';
import { Formik, FormikErrors } from 'formik';


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
  password: {
    marginTop: '1em',
  },
  submitButton: {
    width: '5em',
    marginLeft: 'auto',
    marginTop: '1em',
  },
  failureMessage: {
    color: colors.red[800],
  },
  errorMessage: {
    color: colors.red[800],
  }
});

export interface LoginFormInput {
  username: string
  password: string
}

interface Props {
  className?: string, 
  onSubmit: (input: LoginFormInput) => void,
  loginFailed: boolean
}

export function LoginSection(p: Props){
  const classes = useStyles();

  function validate(i: LoginFormInput){

    let errors: FormikErrors<LoginFormInput> = {};

    if(i.username.length === 0)
      errors.username = 'Username must not be empty';

    if(i.password.length === 0)
      errors.password = 'Password must not be empty';

    return errors;
  }
 
  return (
    <div className={clsx(p.className, classes.root)}>
      <Typography className={classes.heading}>Please login in</Typography>
      <Formik initialValues={{username: '', password: ''}} validate={validate} onSubmit={p.onSubmit}>
        {({ errors, touched, handleSubmit, handleBlur, handleChange, values }) => 
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField 
              label='Username' 
              name='username'
              value={values.username} 
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.username && errors.username && 
              <div className={classes.errorMessage}>{errors.username}</div>}
            <TextField 
              className={classes.password}
              label='Password' 
              name='password'
              type='password'
              value={values.password} 
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.password && errors.password && 
              <div className={classes.errorMessage}>{errors.password}</div>}
            <Button
              className={classes.submitButton}
              type='submit' 
              color='primary'
            >
              Submit
            </Button>      
            {p.loginFailed &&
              <Typography className={classes.failureMessage}>Wrong user name or password</Typography>        
            }      
          </form>
        }
      </Formik>
    </div>
  )
} 