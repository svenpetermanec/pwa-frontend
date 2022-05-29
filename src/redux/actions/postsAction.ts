import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { GetPostsResponse } from 'redux/models/postModel';
import { getPosts } from 'redux/services/post.service';

export const getPostsThunk: AsyncThunk<GetPostsResponse, void, {}> =
  createAsyncThunk<GetPostsResponse, void>('post/get', async () => {
    const response = await getPosts();
    return response.data;
  });
