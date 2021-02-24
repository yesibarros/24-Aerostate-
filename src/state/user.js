import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const sendLoginRequest = createAsyncThunk("LOGIN", () => {
  return axios.post("/api/login").then((r) => r.data);
});

export const addToFavorites = createAsyncThunk(
  "ADD_TO_FAVORITES",
  (flightId, thunkAPI) => {
    const { user } = thunkAPI.getState();
    if (!user._id) throw new Error("You need to be logged in");
    return axios
      .put(`/api/favorites?userId=${user._id}&flightId=${flightId}`)
      .then((res) => res.data);
  }
);

export const removeFromFavorites = createAsyncThunk(
  "REMOVE_FROM_FAVORITES",
  (flightId, thunkAPI) => {
    const { user } = thunkAPI.getState();
    if (!user._id) throw new Error("You need to be logged in"); // this should be imposible
    return axios
      .delete(`/api/favorites?userId=${user._id}&flightId=${flightId}`)
      .then((res) => res.data);
  }
);

const userReducer = createReducer([], {
  [sendLoginRequest.fulfilled]: (state, action) => action.payload,
  [addToFavorites.fulfilled]: (state, action) => action.payload,
  [removeFromFavorites.fulfilled]: (state, action) => action.payload,
});

export default userReducer;
