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
  const refetch = useCallback((key) => {
    const { request, success, failure } = createActions(FETCH_USER)
    dispatch(request({ key }));
    return axios(`https://jsonplaceholder.typicode.com/users/${key}`)
      .then(({ data }) => dispatch(success({ data, key })))
      .catch(error => dispatch(failure({ error, key })))
  }, [dispatch]);
  useEffect(() => {
    if(userId) {
      // ComponentDidUpdate
      refetch(userId);
    }
  }, [userId, refetch]); // shouldComponentUpdate
  return { user: userExpensive, refetch };
}