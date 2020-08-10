
import React, { Fragment } from 'react';
import { useImmer } from 'use-immer'
import { usePostList } from './hooks/usePostList'
import { Button } from '../../components/Button';

function Post({ userId }) {
  const [state, setState] = useImmer({
    inputValue: userId,
    fetchByUserId: userId,
    userSelectKey: userId,
  })
  const { fetchByUserId, inputValue, userSelectKey } = state;
  const { post } = usePostList(fetchByUserId);
  const { data, loading, error } = post(userSelectKey)
  const handleUser = () => {
    const { isLoaded } = post(inputValue);
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
  };
  console.log('render');
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
      </form>

      {error && <div>{error.message}</div>}
      
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <Fragment>
          {error ? (
            <div>Error: {JSON.stringify(error)}</div>
          ) : (
            <ul>
              {data.map(post => (
                <li key={post.id}>
                  {post.title}
                </li>
              ))}
            </ul>
          )}
        </Fragment>
      )}
    </div>
  );
}

Post.defaultProps = {
  userId: 0,
}

export default React.memo(Post);