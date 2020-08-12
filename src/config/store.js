import { postSlice } from '../features/post/redux/postSlice'
import { userSlice } from '../features/user/redux/userSlice'

// Initial Store
export const initialStore = {
  post: postSlice.initialState,
  user: userSlice.initialState,
}

// Combine Reducer
export const mainReducer = (state, action) => ({
  post: postSlice.reducer(state.post, action),
  user: userSlice.reducer(state.user, action),
});
