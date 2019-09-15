export interface PostBasic {
    type: 'PostBaisc'
    title: string
    username: string
}

export interface PostDetails {
    type: 'PostDetails'
    title: string
    username: string
    body: string
    comments: Comment[]
}

export interface Comment {
  username: string
  body: string
}

type FetchablePostDetails = PostDetails & {status: 'fetched' | 'fetching'}

export interface PostListState {
    list: {
        data: (PostBasic | FetchablePostDetails)[] | undefined
        status: 'fetched' | 'fetching'
    }
}