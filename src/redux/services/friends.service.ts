import { AddFriendRequest, SearchUsersRequest } from 'redux/models/friendModel';
import { addFriendRoute, searchRoute } from './friends.service.routes';
import {
  executeHttpGetAuthorized,
  executeHttpPostAuthorized,
} from './requests';

export const searchUsers = async (params: SearchUsersRequest) => {
  return executeHttpGetAuthorized(searchRoute, params);
};

export const addFriend = async (params: AddFriendRequest) => {
  return executeHttpPostAuthorized(addFriendRoute, params);
};
