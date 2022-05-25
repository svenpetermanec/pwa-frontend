import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Friend, FriendActionPayload } from "redux/models/friendModel";

export interface FriendState {
    friends: Friend[];
}

const initialState: FriendState = {
    friends: [],
};

const friendSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        addFriend<T>(state: FriendState = initialState, action: PayloadAction<FriendActionPayload<T>>): void {},
    },
});

const { reducer } = friendSlice;

export default reducer;
