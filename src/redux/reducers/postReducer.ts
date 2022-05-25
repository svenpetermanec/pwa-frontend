import { createSlice } from "@reduxjs/toolkit";
import { Post } from "redux/models/postModel";

export interface PostState {
    posts: Post[];
}

const initialState: PostState = {
    posts: [],
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
});

const { reducer } = postSlice;

export default reducer;
