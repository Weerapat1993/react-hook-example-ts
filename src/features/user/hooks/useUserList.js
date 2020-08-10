import { useEffect, useCallback } from 'react';
import axios from 'axios';
import { FETCH_USER } from '../../../constants/actionTypes';
import { createActions } from '../../../utils/createQuery';
import { useDispatch, useSelector } from '../../../contexts/FeatureContextProvider';

export const useUserList = (userId) => {
  // Reducer
  const user = useSelector('user')
  const dispatch = useDispatch('user')
  const userExpensive = useCallback(user, [user]);
  useEffect(() => {
    if(userId) {
      const { request, success, failure } = createActions(FETCH_USER, userId)
      const fetchData = () => {
        dispatch(request());
        return axios(`https://jsonplaceholder.typicode.com/users/${userId}`)
          .then(res => dispatch(success(res.data)))
          .catch(error => dispatch(failure(error)))
      };
      // ComponentDidUpdate
      fetchData();
    }
  }, [userId, dispatch]); // shouldComponentUpdate
  return { user: userExpensive };
}