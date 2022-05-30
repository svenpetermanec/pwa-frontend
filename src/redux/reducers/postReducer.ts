import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { addPostThunk, getPostsThunk } from 'redux/actions/postsAction';
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
    builder.addCase(getPostsThunk.rejected, (state) => {
      state.loading = true;
    });
    builder.addCase(addPostThunk.fulfilled, (state, action) => {
      state.posts.push(action.payload);
      toast.success('Post created');
    });
    builder.addCase(addPostThunk.rejected, () => {
      toast.error('Problem creating post');
    });
  },
});

const { reducer } = postSlice;

export default reducer;
