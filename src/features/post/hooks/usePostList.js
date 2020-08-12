import { useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from '../../../config/context';
import { request, success, failure } from '../redux/postSlice'

export const usePostList = (userId) => {
  // Reducer
  const post = useSelector('post')
  const dispatch = useDispatch('post')
  const postExpensive = useCallback(post, [post]);
  const refetch = useCallback((key) => {
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