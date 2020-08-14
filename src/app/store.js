import { postSlice } from './post'
import { userSlice } from './user'
import { configureStore } from '../utils/use-codex';

export const store = configureStore({
  initialState: {
    post: postSlice.initialState,
    user: userSlice.initialState,
  },
  reducer: {
    post: postSlice.reducer,
    user: userSlice.reducer,
  },
})