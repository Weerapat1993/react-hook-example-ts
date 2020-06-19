import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { postReducer, initialState } from './reducer'
import { FETCH } from './actionTypes';
import { cofingLogger } from '../../../config/logger';

export const usePostLists = () => {
  const [state, dispatch] = useReducer(cofingLogger(postReducer), initialState);
  const [userId, setPost] = useState(1);

  useEffect(() => {
    const fetchDataRequest = () => ({ type: FETCH.REQUEST, key: userId })
    const fetchDataSuccess = (data) => ({ type: FETCH.SUCCESS, data, key: userId })
    const fetchDataFailure = (error) => ({ type: FETCH.FAILURE, error, key: userId })
    const fetchData = () => {
      dispatch(fetchDataRequest());
      return axios(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(res => dispatch(fetchDataSuccess(res.data)))
        .catch(error => dispatch(fetchDataFailure(error)))
    };

    // ComponentDidMount & ComponentDidUpdate
    fetchData();
  }, [userId]); // shouldComponentUpdate

  return [{ state, setPost }];
}