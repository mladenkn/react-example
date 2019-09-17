import React from 'react';
import { PostList } from './PostList';

interface Props {
  className?: string
}

export function HomeSection(p: Props){
  return (    
    <div className={p.className}>
      <PostList />
    </div>
  )
}