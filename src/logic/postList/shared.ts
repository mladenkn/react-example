import { PostBasic, PostDetails } from '../../data';

export interface State {
    data: (PostBasic | PostDetails)[]
}