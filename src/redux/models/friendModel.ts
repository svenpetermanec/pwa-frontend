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

export interface SearchUserResponse {
  id: number;
  username: string;
}

export interface AddFriendRequest {
  userId: number;
}

export interface AddFriendResponse {
  id: number;
  username: string;
}
