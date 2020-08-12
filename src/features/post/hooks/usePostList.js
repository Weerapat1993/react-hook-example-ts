import { useEffect, useCallback } from 'react';
import axios from 'axios';
import { FETCH_POST_BY_USER_ID } from '../../../constants/actionTypes';
import { createActions } from '../../../utils/createQuery';
import { useDispatch, useSelector } from '../../../contexts/FeatureContextProvider';

export const usePostList = (userId) => {
  // Reducer
  const post = useSelector('post')
  const dispatch = useDispatch('post')
  const postExpensive = useCallback(post, [post]);
  const refetch = useCallback((key) => {
    const { request, success, failure } = createActions(FETCH_POST_BY_USER_ID)
    dispatch(request({ key }));
    return axios(`https://jsonplaceholder.typicode.com/posts?userId=${key}`)
      .then(({ data }) => dispatch(success({ data, key })))
      .catch(error => dispatch(failure({ error })))
  }, [dispatch]);
  useEffect(() => {
    if(userId) {
      // ComponentDidUpdate
      refetch(userId);
    }
  }, [userId, refetch]); // shouldComponentUpdate
  return { post: postExpensive, refetch };
}