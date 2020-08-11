
import React, { Fragment, useRef, useMemo } from 'react';
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
  const isLoaded = useMemo(() => post(inputValue, 'isLoaded', false), [post, inputValue])
  const isData = (data || []).length > 0;
  const handleUser = () => {
    setState((draft) => {
      draft.userSelectKey = inputValue
      if(inputValue && !isLoaded) {
        draft.fetchByUserId = inputValue
      }
    })
  }
  const handleInput = (value) => {
    setState((draft) => {
      draft.inputValue = value;
    })
  }
  // Component Memo
  const RenderError = useMemo(() => (
    error && <div>{error}</div>
  ), [error])
  const RenderData = useMemo(() => (
    loading ? (
      <div>Loading ...</div>
    ) : (
      <Fragment>
        {error ? (
          <div>Error: {JSON.stringify(error)}</div>
        ) : (
          <ul>
            {(data || []).map(post => (
              <li key={post.id}>
                {post.title}
              </li>
            ))}
          </ul>
        )}
      </Fragment>
    )
  ), [loading, error, data])
  console.log('render', count.current++);
  return (
    <div>
      <h2>Post</h2>
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
        {isData && (
          <Button type="submit" onClick={refetch}>
            Refetch
          </Button>
        )}
      </form>
      {RenderError}      
      {RenderData}
    </div>
  );
}

Post.defaultProps = {
  userId: 0,
}

export default React.memo(Post);