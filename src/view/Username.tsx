import React, { Fragment } from 'react';
import { makeStyles, Link, ButtonBase, Card, Popover } from "@material-ui/core";
import { AppState } from '../logic/store';
import { connect } from 'react-redux';
import { UserDetails, UserBasic } from '../logic/postList/types';
import { onUsernameClick } from '../logic/postList/actions';
import { selectUserDetailsDisplayContext } from '../logic/postList/selectors';

type Props = {
  className?: string  
  showDetailsOnClick?: boolean
  user: UserBasic
  appState: AppState
  onUsernameClick: (userId: number) => void
}

export const Username = connect(
  (appState: AppState) => ({appState}),
  { onUsernameClick }
)(UsernameContainer)

function UsernameContainer(p: Props){
  function onClick(){
    p.showDetailsOnClick && p.onUsernameClick(p.user.id)
  }
  const { variant, user } = selectUserDetailsDisplayContext(p.appState.postList, p.user)
  return <UsernamePresenter user={user} variant={variant as any} onClick={onClick} className={p.className}  />
}

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
        <Fragment>
          <Link aria-describedBy={'details-popover'} onClick={p.onClick} className={p.className} component={ButtonBase}>
            {p.user.name} loading details
          </Link>
          <Popover 
            id='details-popover'
            open={true}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            Loading {p.user.name} details
          </Popover>
        </Fragment>
      )
    case 'withDetails':
      return (
        <Fragment>
          <Link onClick={p.onClick} className={p.className} component={ButtonBase}>
            {p.user.name} {p.user.email} details
          </Link>
        </Fragment>
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