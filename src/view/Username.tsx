import React, { Fragment } from 'react';
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

export const Username = 
//connect(() => ({id: Math.random().toString(36)}))
(connect(
  (appState: AppState, p: Props) => {
    console.log(p.id)
    const { variant, user } = selectUserDetailsDisplayContext(appState.postList, p.user, p.id)
    return { variant: variant as any, user };
  },
  (dispatch, p: Props) => {
    console.log(p.id)
    return ({
      onClick: () => dispatch(fetchUserActions.request({ clientId: p.id, userId: p.user.id }))
    });
  }
)(UsernamePresenter));

type PresenterAllwaysProps = {
  onClick: () => void
  className?: string  
}

type PresenterProps = PresenterAllwaysProps & (
  { variant: 'justUsername' | 'loadingDetails', user: UserBasic } |
  { variant: 'withDetails', user: UserDetails } |
  { variant: 'usernameAndDetailsFetchError', user: UserDetails }
)

const useStyles = makeStyles({
  root: {

  },
})
 
function UsernamePresenter(p: PresenterProps){
  const classes = useStyles();

  switch(p.variant){

    case 'justUsername':
      return (
        <Link onClick={p.onClick} className={p.className} component={ButtonBase}>
          {p.user.name}
        </Link>
      )
    case 'loadingDetails':
      return (
        <UsernameWithPopover name={p.user.name}>
          <div>User details loading</div>
        </UsernameWithPopover>
      )
    case 'withDetails':
      return (
        <UsernameWithPopover name={p.user.name}>
          <div>User details</div>
        </UsernameWithPopover>
      )
    case 'usernameAndDetailsFetchError':
      return (
        <Link onClick={p.onClick} className={p.className} component={ButtonBase}>
          {p.user.name} fetch error
        </Link>
      )
    
    default:
      throw new Error();
  }
}

function UsernameWithPopover(p: {className?: string, name: string, children: JSX.Element}){

  const link = (
    <Link aria-describedby={'details-popover'} className={p.className} component={ButtonBase}>
      {p.name}
    </Link>
  );

  return (
    <Fragment>
      {link}
      <Popover 
        id='details-popover'
        open={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {p.children}
      </Popover>
    </Fragment>
  )
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