import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { FETCH_POST_BY_USER_ID } from '../../../constants/actionTypes';
import { configLogger } from '../../../config/logger';
import { createQuery } from '../../../utils/createQuery';

export const usePostLists = (userId) => {
  // Reducer
  const { selector, reducer, initialState } = createQuery(FETCH_POST_BY_USER_ID)
  const [state, dispatch] = useReducer(configLogger(reducer), initialState)
  useEffect(() => {
    if(userId) {
      // ComponentDidUpdate
      const { actions } = createQuery(FETCH_POST_BY_USER_ID)
      const { request, success, failure } = actions(userId)
      const fetchData = () => {
        dispatch(request());
        return axios(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
          .then(res => dispatch(success(res.data)))
          .catch(error => dispatch(failure(error)))
      };
      fetchData();
    }
  }, [userId]); // shouldComponentUpdate

  return { post: key => selector(state, key) };
}