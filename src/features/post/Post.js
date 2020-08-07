
import React, { useState, Fragment } from 'react';
import { usePostLists } from './hooks/pwbHooks'

function Post({ userId }) {
  const [inputValue, setInput] = useState(userId);
  const [fetchByUserId, setFetchByUserId] = useState(userId);
  const [userSelectKey, setUserSelectKey] = useState(userId);
  const { post } = usePostLists(fetchByUserId);
  const { data, loading, error } = post(userSelectKey)
  const handleUser = () => {
    const { isLoaded } = post(inputValue);
    setUserSelectKey(inputValue)
    if(inputValue && !isLoaded) {
      setFetchByUserId(inputValue)
    }
  }
  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="number"
          placeholder="User ID"
          value={inputValue}
          onChange={event => setInput(parseInt(event.target.value))}
        />
        <button type="submit" onClick={handleUser}>
          Search
        </button>
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

export default Post;