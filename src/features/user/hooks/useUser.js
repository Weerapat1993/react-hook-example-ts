import { useEffect, useCallback } from 'react';
import axios from 'axios';
import { FETCH_USER } from '../../../constants/actionTypes';
import { createActions } from '../../../utils/createQuery';
import { useDispatch, useSelector } from '../../../contexts/FeatureContextProvider';

export const useUser = (userId) => {
  // Reducer
  const user = useSelector('user')
  const dispatch = useDispatch('user')
  const userExpensive = useCallback(user, [user]);
  const refetch = useCallback((id) => {
    const { request, success, failure } = createActions(FETCH_USER, id)
    dispatch(request());
    return axios(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => dispatch(success(res.data)))
      .catch(error => dispatch(failure(error)))
  }, [dispatch]);
  useEffect(() => {
    if(userId) {
      // ComponentDidUpdate
      refetch(userId);
    }
  }, [userId, refetch]); // shouldComponentUpdate
  return { user: userExpensive, refetch };
}