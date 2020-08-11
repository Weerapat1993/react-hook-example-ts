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
  const refetch = useCallback((id) => {
    const { request, success, failure } = createActions(FETCH_POST_BY_USER_ID, id)
    dispatch(request());
    return axios(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then(res => dispatch(success(res.data)))
      .catch(error => dispatch(failure(error)))
  }, [dispatch]);
  useEffect(() => {
    if(userId) {
      // ComponentDidUpdate
      refetch(userId);
    }
  }, [userId, refetch]); // shouldComponentUpdate
  return { post: postExpensive, refetch };
}