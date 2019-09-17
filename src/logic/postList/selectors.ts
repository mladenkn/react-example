import { PostListState, PostListViewData, PostDetailsFetchContext } from "./types";

export function selectPostListViewData(state: PostListState): PostListViewData {
    if(state.lastListFetch.data){
        const list = state.lastListFetch.data!.map(p => {
            if(p.id !== state.selectedPostId)
                return p
            else
                return {
                    type: 'PostDetailsFetchContext',
                    basic: p,
                    status: state.lastDetailsFetch.status,
                    details: state.lastDetailsFetch.data
                } as PostDetailsFetchContext
        })
        return { data: list, status: state.lastListFetch.status }    
    }
    else 
        return { data: undefined, status: state.lastListFetch.status }
}

export function selectUserDetailsForUser(state: PostListState, userId: number){
    const userDetails = state.lastUserDetailsFetch;
    const fetchingOrFetchedUser = userId === userDetails.userId && userDetails.userId;
    return fetchingOrFetchedUser ? userDetails : undefined;
}