import { useEffect, useCallback } from 'react';
import axios from 'axios';
import { FETCH_USER } from '../../../constants/actionTypes';
import { createActions, createSelector } from '../../../utils/createQuery';
import { getState, useDispatch } from '../../../contexts/AppContextProvider';

export const useUserList = (userId) => {
  // Reducer
  const { user } = getState()
  const dispatch = useDispatch()
  const userExpensive = useCallback((key) => createSelector(user, key), [user]);
  // const [state, dispatch] = useReducer(...createReducer(FETCH_POST_BY_USER_ID))
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