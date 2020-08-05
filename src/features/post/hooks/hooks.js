import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { postReducer, initialState } from './reducer'
import { FETCH_POST_BY_USER_ID } from '../../../constants/actionTypes';
import { configLogger } from '../../../config/logger';
import { postSelector } from './selectors'

export const usePostLists = (userId) => {
  // Reducer
  const [state, dispatch] = useReducer(configLogger(postReducer), initialState);
  useEffect(() => {
    if(userId) {
      const fetchDataRequest = () => ({ type: FETCH_POST_BY_USER_ID.REQUEST, key: userId })
      const fetchDataSuccess = (data) => ({ type: FETCH_POST_BY_USER_ID.SUCCESS, data, key: userId })
      const fetchDataFailure = (error) => ({ type: FETCH_POST_BY_USER_ID.FAILURE, error, key: userId })
      const fetchData = () => {
        dispatch(fetchDataRequest());
        return axios(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
          .then(res => dispatch(fetchDataSuccess(res.data)))
          .catch(error => dispatch(fetchDataFailure(error)))
      };
      // ComponentDidUpdate
      fetchData();
    }
  }, [userId]); // shouldComponentUpdate

  return { post: id => postSelector(state, id) };
}