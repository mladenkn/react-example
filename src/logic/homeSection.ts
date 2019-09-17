import { PostListState } from "./postList/types";

interface UserDetails {

}

export interface HomePageState {
    posts: PostListState
    userDetails: UserDetails
}