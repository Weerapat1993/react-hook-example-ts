
import React, { Fragment, useRef, useMemo, useCallback } from 'react';
import { useImmer } from 'use-immer'
import { usePostList } from './hooks/usePostList'
import { Button } from '../../components/Button';

function Post({ userId }) {
  const count = useRef(0)
  const [state, setState] = useImmer({
    inputValue: userId,
    fetchByUserId: userId,
    userSelectKey: userId,
  })
  const { fetchByUserId, inputValue, userSelectKey } = state;
  const { post, refetch } = usePostList(fetchByUserId);
  const { data, loading, error } = useMemo(() => post(userSelectKey), [post, userSelectKey])
  const { isLoaded } = useMemo(() => post(inputValue), [post, inputValue])
  const handleUser = useCallback(() => {
    setState((draft) => {
      draft.userSelectKey = inputValue
      if(inputValue && !isLoaded) {
        draft.fetchByUserId = inputValue
      }
    })
  }, [setState, isLoaded, inputValue])
  const handleInput = useCallback((value) => {
    setState((draft) => {
      draft.inputValue = value;
    })
  }, [setState]);
  // Component Memo
  const RenderList = useMemo(() => (
    <ul>
      {(data || []).map(post => (
        <li key={post.id}>
          {post.title}
        </li>
      ))}
    </ul>
  ), [data])
  const RenderError = useMemo(() => (
    error && <div>{error}</div>
  ), [error])
  const RenderRefetchButton = useMemo(() => (
    (data || []).length > 0 && (
      <Button type="submit" onClick={refetch}>
        Refetch
      </Button>
    )
  ), [data, refetch])
  const RenderData = useMemo(() => (
    loading ? (
      <div>Loading ...</div>
    ) : (
      <Fragment>
        {error ? (
          <div>Error: {JSON.stringify(error)}</div>
        ) : (
          RenderList
        )}
      </Fragment>
    )
  ), [loading, error, RenderList])
  const RenderSearch = useMemo(() => (
    <form onSubmit={e => e.preventDefault()}>
      <input
        type="number"
        placeholder="User ID"
        value={inputValue}
        onChange={e => handleInput(e.target.value ? parseInt(e.target.value) : '')}
      />
      <Button type="submit" onClick={handleUser}>
        Search
      </Button>
      {RenderRefetchButton}
    </form>
  ), [inputValue, RenderRefetchButton, handleInput, handleUser])
  console.log('render', count.current++);
  return (
    <div>
      <h2>Post</h2>
      {RenderSearch}
      {RenderError}      
      {RenderData}
    </div>
  );
}

Post.defaultProps = {
  userId: 0,
}

export default React.memo(Post);