import React from 'react';
import { PostList } from './PostList';

export function HomeSection(p: {className?: string}){
  return (
    <div className={p.className}>
      <PostList />
    </div>
  )
}