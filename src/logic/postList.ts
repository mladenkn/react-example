import { PostDetails, PostBasic, postBasicList, getPostDetails, getPostBasic } from "../data";
import { createSlice, PayloadAction } from "redux-starter-kit";

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

// state is not mutated because of Immer!
export const { reducer: postListReducer, actions: postListActions } = createSlice({
    initialState,
    reducers: {
        onPostBasicClick(state, action: PayloadAction<number>){            
            const postId = action.payload
            const clickedPostDetails = getPostDetails(postId)!
    
            const indexOfLastActivePost = state.data.findIndex(p => p.type === 'PostDetails')
            const lastActivePost = state.data[indexOfLastActivePost]
    
            const indexOfClickedPost = state.data.findIndex(p => p.id === postId)
            
            lastActivePost && (state.data[indexOfLastActivePost] = getPostBasic(lastActivePost.id)!)
            state.data[indexOfClickedPost] = clickedPostDetails  
        }
    },
})