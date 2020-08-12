import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { FETCH_POST_BY_USER_ID } from '../../../constants/actionTypes';
import { configLogger } from '../../../config/logger';
import { postReducer, initialState } from './reducer'
import { postSelector } from './selectors'

export const usePostLists = (userId) => {
  // Reducer
  const [state, dispatch] = useReducer(configLogger(postReducer), initialState);
  useEffect(() => {
    if(userId) {
      const fetchDataRequest = (payload) => ({ type: FETCH_POST_BY_USER_ID.REQUEST, payload })
      const fetchDataSuccess = (payload) => ({ type: FETCH_POST_BY_USER_ID.SUCCESS, payload })
      const fetchDataFailure = (payload) => ({ type: FETCH_POST_BY_USER_ID.FAILURE, payload })
      const fetchData = () => {
        dispatch(fetchDataRequest({ key: userId }));
        return axios(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
          .then(({ data }) => dispatch(fetchDataSuccess({ data, key: userId })))
          .catch(error => dispatch(fetchDataFailure({ error, key: userId })))
      };
      // ComponentDidUpdate
      fetchData();
    }
  }, [userId]); // shouldComponentUpdate

  return { post: id => postSelector(state, id) };
}