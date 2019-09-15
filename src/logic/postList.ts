import { PostDetails, PostBasic, postBasicList, getPostDetails, getPostBasic } from "../data";

// type FetchablePostDetails = {
//     data: PostDetails | undefined
//     status: 'fetched' | 'fetching'
// }

// export interface PostListState {
//     data: (PostBasic | FetchablePostDetails)[] | undefined
//     status: 'fetched' | 'fetching'
// }

export interface PostListState {
    data: (PostBasic | PostDetails)[]
}

const initialState: PostListState = {
    data: postBasicList
}

export function postListReducer(state = initialState, action: any){
    switch(action.type){

        case 'ON_POST_BASIC_CLICK': 
            const postId = action.payload
            const clickedPostDetails = getPostDetails(postId)!
    
            const indexOfLastActivePost = state.data.findIndex(p => p.type === 'PostDetails')
            const lastActivePost = state.data[indexOfLastActivePost]
    
            const indexOfClickedPost = state.data.findIndex(p => p.id === postId)
            
            const postListCopy = state.data.map(p => p)
            lastActivePost && (postListCopy[indexOfLastActivePost] = getPostBasic(lastActivePost.id)!)
            postListCopy[indexOfClickedPost] = clickedPostDetails

            return { data: postListCopy }

        default: 
            return state
    }
}