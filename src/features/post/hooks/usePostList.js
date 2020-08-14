import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from '../../../utils/use-codex';
import { makeSelectPostByUserId, fetchPostByUserId } from '../../../app/post'

export const usePostList = (userId) => {
  // Reducer
  const selectPostByUserId = useMemo(makeSelectPostByUserId, [])
  const post = useSelector('post', selectPostByUserId)
  const dispatch = useDispatch('post')
  const postExpensive = useCallback(post, [post]);
  const refetch = useCallback((key) => fetchPostByUserId(key)(dispatch), [dispatch]);
  useEffect(() => {
    if(userId) {
      // ComponentDidUpdate
      refetch(userId);
    }
  }, [userId, refetch]); // shouldComponentUpdate
  return { post: postExpensive, refetch };
}