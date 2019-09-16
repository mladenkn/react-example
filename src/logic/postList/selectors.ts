import { PostListState } from "./types";

export function selectPostList(state: PostListState){
    return state.data.map(p => {
        if(p.type === 'PostDetailsFetchContext')
            return p.status === 'fetched' ? p.details! : p.basic;
        else
            return p
    })
} 