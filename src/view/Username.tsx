import React, { createContext, useContext } from 'react';
import { makeStyles, Link, ButtonBase, Card } from "@material-ui/core";
import { AppState } from '../logic/store';
import { connect } from 'react-redux';
import { UserDetails, UserBasic } from '../logic/postList/types';
import { onUsernameClick } from '../logic/postList/actions';
import { Dispatch } from 'redux';
import { AsyncOperationStatus } from '../utils';

const useStyles = makeStyles({
  root: {

  },
})

type Props = {
  className?: string  
  showDetailsOnClick?: boolean
  user: UserBasic
  appState: AppState
  dispatch: Dispatch
}

export const Username = connect(
  (appState: AppState) => ({appState}),
  (dispatch) => ({dispatch})
)(UsernameContainer)

function UsernameContainer(p: Props){
  function onClick(){
    if(p.showDetailsOnClick){
      p.dispatch(onUsernameClick(p.user.id))
    }
  }
  const { lastUserDetailsFetch }  = p.appState.postList;
  
  let user: UserBasic | UserDetails
  let variant: any

  if((lastUserDetailsFetch.status === AsyncOperationStatus.NotInitiated) || lastUserDetailsFetch.userId !== p.user.id){
    variant = 'justUsername';
    user = p.user;
  }
  else if(lastUserDetailsFetch.status === AsyncOperationStatus.Processing){
    variant = 'loadingDetails';
    user = p.user;
  }
  else if((lastUserDetailsFetch.status === AsyncOperationStatus.Completed)){
    variant = 'withDetails';
    user = lastUserDetailsFetch.data!;
  }
  else if(lastUserDetailsFetch.status === AsyncOperationStatus.Errored){
    variant = 'detailsFetchError';
    user = p.user;
  }
  else
    throw new Error()

  return <UsernamePresenter user={user} variant={variant} onClick={onClick} className={p.className}  />
}

type PresenterAllwaysProps = {
  onClick: () => void
  className?: string  
}

type PresenterProps = PresenterAllwaysProps & ({
  variant: 'justUsername' | 'loadingDetails',
  user: UserBasic
} |
{
  variant: 'withDetails',
  user: UserDetails
} |
{
  variant: 'detailsFetchError',
  user: UserDetails
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
        <Link onClick={p.onClick} className={p.className} component={ButtonBase}>
          {p.user.name} loading details
        </Link>
      )
    case 'withDetails':
      return (
        <Link onClick={p.onClick} className={p.className} component={ButtonBase}>
          {p.user.name} {p.user.email} details
        </Link>
      )
    case 'detailsFetchError':
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