import { FriendTypeEnum } from 'utils/enums';

export interface Friend {
  id: number;
  username: string;
}

export interface FriendActionPayload<T> {
  friendType: FriendTypeEnum;
  actionContext?: T;
}

export interface SearchUsersRequest {
  username: string;
}

export interface SearchUserResponse extends Friend {}

export interface AddFriendRequest {
  userId: number;
}

export interface AddFriendResponse extends Friend {}

export interface GetFriendsResponse {
  friends: Friend[];
}
