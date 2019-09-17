import React, { Fragment, useState } from 'react';
import { makeStyles, Link, ButtonBase, Card, Popover } from "@material-ui/core";
import { AppState } from '../logic/store';
import { connect } from 'react-redux';
import { UserDetails, UserBasic } from '../logic/postList/types';
import { fetchUserActions } from '../logic/postList/actions';
import { selectUserDetailsDisplayContext } from '../logic/postList/selectors';
import { useRef } from 'react';

type Props = {
  className?: string  
  user: UserBasic
  id: string
}

export const Username = connect(
  (appState: AppState, p: Props) => {
    const { variant, user } = selectUserDetailsDisplayContext(appState.postList, p.user, p.id)
    return { variant: variant as any, user };
  },
  (dispatch, p: Props) => {
    return ({
      onClick: () => dispatch(fetchUserActions.request({ clientId: p.id, userId: p.user.id }))
    });
  }
)(UsernamePresenter);

type PresenterAllwaysProps = {
  onClick: () => void
  className?: string
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
      default:
        throw new Error();
    }
  }

  function handleClick(event: any) {
    p.onClick();
    setIsClosedByUser(false);
    setAnchorEl(event.currentTarget);
  }

  return (
    <Fragment>
      <Link 
        onClick={handleClick} 
        aria-describedby='details-popover' 
        className={p.className} 
        component={ButtonBase}
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

const useUserDetailsLoadingStyles = makeStyles({

})

function UserDetailsLoading(p: {user: UserBasic}){
  const classes = useUserDetailsLoadingStyles();
  return (
    <div>
      Loading {p.user.name}
    </div>
  )
}

const useUserDetailsStyles = makeStyles({

})

function UserDetailsUI(p: {user: UserDetails}){
  const classes = useUserDetailsStyles();
  return (
    <div>
      {p.user.name}
    </div>
  )
}