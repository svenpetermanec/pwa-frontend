import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import {
  AddFriendRequest,
  AddFriendResponse,
  SearchUserResponse,
  SearchUsersRequest,
} from 'redux/models/friendModel';
import { addFriend, searchUsers } from 'redux/services/friends.service';

export const searchUsersThunk: AsyncThunk<
  SearchUserResponse,
  SearchUsersRequest,
  {}
> = createAsyncThunk<SearchUserResponse, SearchUsersRequest>(
  'friend/search',
  async (request, thunkApi) => {
    const response = await searchUsers(request);
    return response.data;
  }
);

export const addFriendThunk: AsyncThunk<
  AddFriendResponse,
  AddFriendRequest,
  {}
> = createAsyncThunk<AddFriendResponse, AddFriendRequest>(
  'friend/add',
  async (request, thunkApi) => {
    const response = await addFriend(request);
    return response.data;
  }
);
