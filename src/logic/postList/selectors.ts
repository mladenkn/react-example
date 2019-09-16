import { State } from "./shared";

export function selectPostList(state: State){
    return state.data.map(p => {
        if(p.type === 'PostDetailsFetchContext')
            return p.status === 'fetched' ? p.details! : p.basic;
        else
            return p
    })
} 