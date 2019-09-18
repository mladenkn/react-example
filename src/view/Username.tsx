import React, { Fragment, useState } from 'react';
import { makeStyles, Link, ButtonBase, Popover, Typography, CircularProgress } from "@material-ui/core";
import { AppState } from '../logic/store';
import { connect } from 'react-redux';
import { UserDetails, UserBasic } from '../logic/postList/types';
import { fetchUserActions } from '../logic/postList/actions';
import { selectUserDetailsDisplayContext } from '../logic/postList/selectors';

export type UsernameProps = {
  className?: string  
  user: UserBasic
  id: string
  canShowUserDetails?: boolean
}

export const Username = connect(
  (appState: AppState, p: UsernameProps) => {
    const { variant, user } = selectUserDetailsDisplayContext(
      appState.postList, p.user, p.id, p.canShowUserDetails || false
    );
    return { variant: variant as any, user, isClickable: p.canShowUserDetails || false };
  },
  (dispatch, p: UsernameProps) => ({
    // it may be bette to fetch in component to avout clientId
    onClick: () => p.canShowUserDetails && dispatch(fetchUserActions.request({ clientId: p.id, userId: p.user.id }))
  })
)(UsernamePresenter);

type PresenterAllwaysProps = {
  onClick: () => void
  className?: string
  isClickable: boolean
}

type PresenterProps = PresenterAllwaysProps & (
  { variant: 'justUsername' | 'loadingDetails', user: UserBasic } |
  { variant: 'withDetails', user: UserDetails } |
  { variant: 'usernameAndDetailsFetchError', user: UserDetails }
)
 
function UsernamePresenter(p: PresenterProps){
  const [anchorEl, setAnchorEl] = useState(null);
  const [isClosedByUser, setIsClosedByUser] = useState(false);

  function getPopoverContent(){
    switch(p.variant){
      case 'justUsername':
        return <Fragment />;
      case 'loadingDetails':
        return <UserDetailsLoading user={p.user} />;
      case 'withDetails':
        return <UserDetailsUI user={p.user} />;
      case 'usernameAndDetailsFetchError':
        return <div>{p.user.name} fetch error</div>;
    }
  }

  function handleClick(event: any) {
    if(p.isClickable){
      p.onClick();
      setIsClosedByUser(false);
      setAnchorEl(event.currentTarget);
    }
  }

  return (
    <Fragment>
      <Link 
        onClick={handleClick} 
        aria-describedby='details-popover' 
        className={p.className} 
        underline={p.isClickable ? 'hover' : 'none'}
        component={p.isClickable ? ButtonBase : 'div'}
      >
        {p.user.name}
      </Link>
      <Popover 
        id='details-popover'
        onClose={() => setIsClosedByUser(true)}
        open={isClosedByUser ? false : p.variant !== 'justUsername'}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {getPopoverContent()}
      </Popover>
    </Fragment>
  );  
}

const useUserDetailsBaseStyles = makeStyles({
  root: {
    padding: '0.3em 0.5em',
  },
  heading: {
    fontSize: '1.1em',
  },
  body: {
    marginTop: '0.1em',
    marginLeft: '0.2em',
  },
})

function UserDetailsLoading(p: {user: UserBasic}){
  const classes = useUserDetailsBaseStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.heading}>{p.user.name}</Typography>
      <CircularProgress className={classes.body} />
    </div>
  )
}

const useUserDetailsStyles = makeStyles({
  prop: {
    fontSize: '0.95em',
  }
})

function UserDetailsUI(p: {user: UserDetails}){
  const baseClasses = useUserDetailsBaseStyles();
  const classes = useUserDetailsStyles();

  const { name, email, phone, address } = p.user;
  const addressStr = `${address.street}, ${address.suite}`;

  return (
    <div className={baseClasses.root}>
      <Typography className={baseClasses.heading}>{name}</Typography>
      <div className={baseClasses.body}>
        <Typography className={classes.prop}>Email: {email}</Typography>
        <Typography className={classes.prop}>Phone: {phone}</Typography>
        <Typography className={classes.prop}>Address: {addressStr}</Typography>
        <Typography className={classes.prop}>City: {address.city}</Typography>
      </div>
    </div>
  )
}