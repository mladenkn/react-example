import { PostDetails, PostBasic, postBasicList, getPostDetails, getPostBasic } from "../data";
import { useState } from "react";

type FetchablePostDetails = PostDetails & {status: 'fetched' | 'fetching'}

export interface PostListState {
    data: (PostBasic | FetchablePostDetails)[] | undefined
    status: 'fetched' | 'fetching'
}

export function usePostListLogic(){

    const [postList, setPostList] = useState<(PostBasic | PostDetails)[]>(postBasicList)
    
    function onPostBasicClick(id: number){
        const clickedPostDetails = getPostDetails(id)!

        const indexOfLastActivePost = postList.findIndex(p => p.type === 'PostDetails')
        const lastActivePost = postList[indexOfLastActivePost]

        const indexOfClickedPost = postList.findIndex(p => p.id === id)
        
        const postListCopy = postList.map(p => p)
        lastActivePost && (postListCopy[indexOfLastActivePost] = getPostBasic(lastActivePost.id)!)
        postListCopy[indexOfClickedPost] = clickedPostDetails
        
        setPostList(postListCopy)
    }

    return { postList, onPostBasicClick }
}