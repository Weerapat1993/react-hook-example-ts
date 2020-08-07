import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { FETCH_POST_BY_USER_ID } from '../../../constants/actionTypes';
import { configLogger } from '../../../config/logger';
import { createQuery } from '../../../utils/createQuery';
import { createActions } from '../../../utils/createActions';

export const usePostLists = (userId) => {
  // Reducer
  const { selector, reducer, initialState } = createQuery(FETCH_POST_BY_USER_ID)
  const [state, dispatch] = useReducer(configLogger(reducer), initialState)
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
  return { post: key => selector(state, key) };
}