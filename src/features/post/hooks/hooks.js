import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { postReducer, initialState } from './reducer'
import { FETCH } from './actionTypes';
import { configLogger } from '../../../config/logger';
import { postSelector } from './selectors'

export const usePostLists = (userId) => {
  // Reducer
  const [post, dispatch] = useReducer(configLogger(postReducer), initialState);
  useEffect(() => {
    if(userId) {
      const fetchDataRequest = () => ({ type: FETCH.REQUEST, key: userId })
      const fetchDataSuccess = (data) => ({ type: FETCH.SUCCESS, data, key: userId })
      const fetchDataFailure = (error) => ({ type: FETCH.FAILURE, error, key: userId })
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

  return { post: id => postSelector(post, id) };
}