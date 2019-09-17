import { PostListState, PostListViewData, PostDetailsFetchContext, UserDetails, UserBasic } from "./types";
import { AsyncOperationStatus } from "../../utils";

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

export function selectUserDetailsForUser(state: PostListState, clientId: string){
    const userDetails = state.lastUserDetailsFetch;
    const fetchingOrFetchedUser = clientId === userDetails.clientId && userDetails.clientId;
    return fetchingOrFetchedUser ? userDetails : undefined;
}

type UsernameDisplayVariant = 'justUsername' | 'loadingDetails' | 'withDetails' | 'usernameAndDetailsFetchError'

export function selectUserDetailsDisplayContext(state: PostListState, user: UserBasic, clientId: string):
  {variant: UsernameDisplayVariant, user: UserBasic | UserDetails}{
      
  const { lastUserDetailsFetch } = state;

  if((lastUserDetailsFetch.status === AsyncOperationStatus.NotInitiated) || lastUserDetailsFetch.clientId !== clientId){
    return { variant: 'justUsername', user };
  }
  else if(lastUserDetailsFetch.status === AsyncOperationStatus.Processing){
    return { variant: 'loadingDetails', user };
  }
  else if((lastUserDetailsFetch.status === AsyncOperationStatus.Completed)){
    return { variant: 'withDetails', user: lastUserDetailsFetch.data! };
  }
  else if(lastUserDetailsFetch.status === AsyncOperationStatus.Errored){
    return { variant: 'usernameAndDetailsFetchError', user };
  }
  else
    throw new Error()
}