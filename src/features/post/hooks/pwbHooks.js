import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { FETCH_POST_BY_USER_ID } from '../../../constants/actionTypes';
import { createReducer, createActions, createSelector } from '../../../utils/createQuery';

export const usePostLists = (userId) => {
  // Reducer
  const [state, dispatch] = useReducer(...createReducer(FETCH_POST_BY_USER_ID))
  useEffect(() => {
    if(userId) {
      const { request, success, failure } = createActions(FETCH_POST_BY_USER_ID, userId)
      const fetchData = () => {
        dispatch(request());
        return axios(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
          .then(res => dispatch(success(res.data)))
          .catch(error => dispatch(failure(error)))
      };
      // ComponentDidUpdate
      fetchData();
    }
  }, [userId]); // shouldComponentUpdate
  return { post: key => createSelector(state, key) };
}