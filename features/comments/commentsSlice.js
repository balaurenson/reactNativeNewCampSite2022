import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../shared/baseUrl";




export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await fetch(baseUrl + "comments");
    return response.json();
  }
);

const postComment = createAsyncThunk(
  'comments/postComment',
  async (payload, { dispatch, getState}) => {
    setTimeout(() => {
      const { comments } = getState();
      
    }, 2000);
  }
)


const commentsSlice = createSlice({    // Task 3 -- Need help
  name: "comments",
  initialState: { isLoading: true, errMess: null, commentsArray: [] },
  reducers: {
    addComment: (state, action) => {
      if (state.includes(action.payload)) {
        return state.filter((state) => !== action.payload);
      } else {
        state.commentsArray.push(action.payload);
      }
    }
  },
  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errMess = null;
      state.commentsArray = action.payload;
    },
    [fetchComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMess = action.error ? action.error.message : "Fetch failed";
    },
  },
});

export const { addComment } = commentsSlice.reducer;
export const commentsReducer = commentsSlice.reducer;
