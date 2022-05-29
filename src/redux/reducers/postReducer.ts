import { createSlice } from '@reduxjs/toolkit';
import { getPostsThunk } from 'redux/actions/postsAction';
import { Post } from 'redux/models/postModel';

export interface PostState {
  posts: Post[];
  loading: boolean;
}

const initialState: PostState = {
  posts: [],
  loading: false,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostsThunk.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.loading = false;
    });
    builder.addCase(getPostsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPostsThunk.rejected, (state, action) => {
      state.loading = true;
    });
  },
});

const { reducer } = postSlice;

export default reducer;
