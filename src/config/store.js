import { postSlice } from '../features/post/redux/postSlice'
import { userSlice } from '../features/user/redux/userSlice'
import { configureStore } from '../utils/tools/reduxToolkit';

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