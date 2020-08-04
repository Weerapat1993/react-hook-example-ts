
import React, { useState, Fragment } from 'react';
import { usePostLists } from './hooks/hooks'

function Post() {
  const [input, setInput] = useState(0);
  const [userId, setUserId] = useState(0);
  const [pageSelect, setPageSelect] = useState(0);
  const { post }= usePostLists(userId);
  const { data, loading, error } = post(pageSelect)
  const handlePage = (userId) => {
    const { isLoaded } = post(userId);
    setPageSelect(userId)
    if(userId && !isLoaded) {
      setUserId(userId)
    }
  }
  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="number"
          placeholder="User ID"
          value={input}
          onChange={event => setInput(event.target.value)}
        />
        <button type="submit" onClick={() => handlePage(parseInt(input))}>
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