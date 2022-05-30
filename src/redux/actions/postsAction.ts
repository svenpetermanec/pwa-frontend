import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { AddPostResponse, GetPostsResponse } from 'redux/models/postModel';
import { addPost, getPosts } from 'redux/services/posts/posts.service';

export const getPostsThunk: AsyncThunk<GetPostsResponse, void, {}> =
  createAsyncThunk<GetPostsResponse, void>('post/get', async () => {
    const response = await getPosts();
    return response.data;
  });

export const addPostThunk: AsyncThunk<AddPostResponse, FormData, {}> =
  createAsyncThunk<AddPostResponse, FormData>(
    'post/add',
    async (request, thunkApi) => {
      const response = await addPost(request);
      return response.data;
    }
  );
