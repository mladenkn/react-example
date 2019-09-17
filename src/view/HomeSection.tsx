import React from 'react';
import { PostList } from './PostList';
import { UsernameContext } from './Username';
import { onUsernameClick } from '../logic/homeSection';
import { connect } from 'react-redux';

interface Props {
  className?: string
  onUsernameClick: (userId: number) => void
}

export const HomeSection = connect(
  () => {},
  { onUsernameClick }
)(HomeSectionPresenter)

function HomeSectionPresenter(p: Props){

  const usernameContextValue = {
    onClick: p.onUsernameClick,
  }

  return (    
    <div className={p.className}>
      <UsernameContext.Provider value={usernameContextValue}>
        <PostList />
      </UsernameContext.Provider>
    </div>
  )
}