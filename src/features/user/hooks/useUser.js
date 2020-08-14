import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from '../../../config/context';
import { makeSelectUserById, fetchUserById } from '../../../app/user'

export const useUser = (userId) => {
  // Reducer
  const selectUserById = useMemo(makeSelectUserById, [])
  const user = useSelector('user', selectUserById)
  const dispatch = useDispatch('user')
  const userExpensive = useCallback(user, [user]);
  const refetch = useCallback((key) => fetchUserById(key)(dispatch), [dispatch])
  useEffect(() => {
    if(userId) {
      // ComponentDidUpdate
      refetch(userId);
    }
  }, [userId, refetch]); // shouldComponentUpdate
  return { user: userExpensive, refetch };
}