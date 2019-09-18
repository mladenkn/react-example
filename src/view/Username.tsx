import React, { Fragment, useState } from 'react';
import { makeStyles, Link, ButtonBase, Popover, Typography, CircularProgress, List, ListItem, ListItemText } from "@material-ui/core";
import { AppState } from '../logic/store';
import { connect } from 'react-redux';
import { UserBasic, UserDetailsViewData, TodoBasic } from '../logic/postList/types';
import { fetchUserActions } from '../logic/postList/actions';
import { selectUserDetailsDisplayContext } from '../logic/postList/selectors';
import { UserDetailsLoading, UserDetails as UserDetailsUI } from './UserDetails';

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
  { variant: 'withDetails', user: UserDetailsViewData } |
  { variant: 'usernameAndDetailsFetchError', user: UserDetailsViewData }
)

const useUsernameStyles = makeStyles({
  popoverContent: {
    maxHeight: '60vh',
    overflowY: 'auto',
    width: '25em',
  },
});
 
function UsernamePresenter(p: PresenterProps){
  const classes = useUsernameStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isClosedByUser, setIsClosedByUser] = useState(false);

  function getPopoverContent(){
    switch(p.variant){
      case 'justUsername':
        return <Fragment />;
      case 'loadingDetails':
        return <UserDetailsLoading className={classes.popoverContent} user={p.user} />;
      case 'withDetails':
        return <UserDetailsUI className={classes.popoverContent} user={p.user} />;
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