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
  const fetchData = useCallback(() => {
     const { request, success, failure } = createActions(FETCH_POST_BY_USER_ID, userId)
    dispatch(request(userId));
    return axios(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(res => dispatch(success(res.data, userId)))
      .catch(error => dispatch(failure(error, userId)))
  }, [dispatch, userId]);
  useEffect(() => {
    if(userId) {
      // ComponentDidUpdate
      fetchData();
    }
  }, [userId, fetchData]); // shouldComponentUpdate
  return { post: postExpensive, refetch: fetchData };
}