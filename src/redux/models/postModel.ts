export interface Post {
  id: number;
  content: string;
  timestamp: Date;
  images: string[];
  userId: number;
  username: string;
}

export interface GetPostsResponse {
  posts: Post[];
}

export interface AddPostResponse extends Post {}

export interface AddPostRequest {
  content: Text;
  image: BinaryData[];
}
