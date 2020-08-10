import { useEffect, useCallback } from 'react';
import axios from 'axios';
import { FETCH_POST_BY_USER_ID } from '../../../constants/actionTypes';
import { createActions, createSelector } from '../../../utils/createQuery';
import { useDispatch, getState } from '../../../contexts/AppContextProvider';

export const usePostList = (userId) => {
  // Reducer
  const { post } = getState()
  const dispatch = useDispatch()
  const postExpensive = useCallback((key) => createSelector(post, key), [post]);
  // const [state, dispatch] = useReducer(...createReducer(FETCH_POST_BY_USER_ID))
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
  }, [userId, dispatch]); // shouldComponentUpdate
  return { post: postExpensive };
}