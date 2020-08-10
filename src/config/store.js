import { FETCH_POST_BY_USER_ID } from '../constants/actionTypes'
import { createQuery } from '../utils/createQuery';

export const postSlice = createQuery(FETCH_POST_BY_USER_ID)

// Initial Store
export const initialStore = {
  post: postSlice.initialState,
}

// Combine Reducer
export const mainReducer = (state, action) => ({
  post: postSlice.reducer(state.post, action),
});
