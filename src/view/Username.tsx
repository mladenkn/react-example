import React, { createContext, useContext } from 'react';
import { makeStyles, Link, ButtonBase } from "@material-ui/core";
import { FetchOf } from '../logic/fetchableState';
import { AppState } from '../logic/store';
import { connect } from 'react-redux';
import { UserDetails } from '../logic/postList/types';

const useStyles = makeStyles({
  root: {

  },
})

interface UsernameOwnProps {
  className?: string
  user: {
    id: number
    name: string
  }
}

export interface UsernameProps extends UsernameOwnProps {
  userDetails?: FetchOf<UserDetails>
}

interface ContextProps {  
  onClick: (userId: number) => void
}

export const UsernameContext = createContext<ContextProps | undefined>(undefined)

export const Username = connect(
  (state: AppState, ownProps: UsernameOwnProps) => {
    const userDetails = state.postList.lastUserDetailsFetch;
    const fetchingOrFetchedUser = ownProps.user.id === userDetails.userId && userDetails.userId;
    return fetchingOrFetchedUser ? {userDetails} : {};
  }
)(UsernamePresenter)
 
export function UsernamePresenter(p: UsernameProps){
  const classes = useStyles();
  const context = useContext(UsernameContext);
  console.log(p.userDetails, p.user.id);
  const onClick = context && (() => context!.onClick(p.user.id));
  return (
    <Link onClick={onClick} className={p.className} component={ButtonBase}>
      {p.user.name}
    </Link>
  )
}