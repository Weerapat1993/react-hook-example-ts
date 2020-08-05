
import React, { useState, Fragment } from 'react';
import { usePostLists } from './hooks/pwbHooks'

function Post() {
  const [input, setInput] = useState(0);
  const [fetchByUserId, setFetchByUserId] = useState(0);
  const [userSelectKey, setUserSelectKey] = useState(0);
  const { post } = usePostLists(fetchByUserId);
  const { data, loading, error } = post(userSelectKey)
  const handleUser = () => {
    const { isLoaded } = post(input);
    setUserSelectKey(input)
    if(input && !isLoaded) {
      setFetchByUserId(input)
    }
  }
  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="number"
          placeholder="User ID"
          value={input}
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

export default Post;