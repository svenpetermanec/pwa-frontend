import { createSlice } from '@reduxjs/toolkit';
import {
  addFriendThunk,
  getFriendsThunk,
  searchUsersThunk,
} from 'redux/actions/friendsAction';
import { Friend } from 'redux/models/friendModel';
import { toast } from 'react-toastify';

export interface FriendState {
  friends: Friend[];
  loading: boolean;
}

const initialState: FriendState = {
  friends: [],
  loading: false,
};

const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchUsersThunk.rejected, (state) => {
      toast.error('No user found');
    });
    builder.addCase(addFriendThunk.fulfilled, (state, action) => {
      toast.success('Friend added');
      state.friends.push(action.payload);
      state.loading = false;
    });
    builder.addCase(addFriendThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addFriendThunk.rejected, (state) => {
      toast.warning('User already befriended');
      state.loading = false;
    });
    builder.addCase(getFriendsThunk.fulfilled, (state, action) => {
      state.friends = action.payload.friends;
    });
  },
});

const { reducer } = friendSlice;

export default reducer;
