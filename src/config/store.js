import { FETCH_POST_BY_USER_ID, FETCH_USER } from '../constants/actionTypes'
import { createQuery } from '../utils/createQuery';

export const postSlice = createQuery(FETCH_POST_BY_USER_ID)
export const userSlice = createQuery(FETCH_USER)

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
