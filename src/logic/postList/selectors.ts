import { PostListState, PostListViewData, PostDetailsFetchContext } from "./types";

export function selectPostListViewData(state: PostListState): PostListViewData {
    console.log('tu sam')
    if(state.lastListFetch.data){
        const list = state.lastListFetch.data!.map(p => {
            if(p.id !== state.selectedPostId)
                return p
            else
                return {
                    type: 'PostDetailsFetchContext',
                     basic: p,
                     ...state.lastDetailsFetch,
                } as PostDetailsFetchContext
        })
        console.log(list)
        return { data: list, status: state.lastListFetch.status }    
    }
    else 
        return { data: undefined, status: state.lastListFetch.status }
}