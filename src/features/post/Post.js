
import React, { useState, Fragment } from 'react';
import { usePostLists } from './hooks/hooks'
import { postSelector } from './hooks/selectors';

function Post() {
  const [input, setInput] = useState(0);
  const [userId, setUserId] = useState(0);
  const [pageSelect, setPageSelect] = useState(0);
  const { state }= usePostLists(userId);
  const { data, loading, error } = postSelector(state, pageSelect)
  const handlePage = (page) => {
    const { isLoaded } = postSelector(state, page);
    setPageSelect(page)
    if(page && !isLoaded) {
      setUserId(page)
    }
  }
  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          placeholder="User ID"
          value={input}
          onChange={event => setInput(event.target.value)}
        />
        <button type="submit" onClick={() => handlePage(input)}>
          Search
        </button>
      </form>

      {error && <div>{error}</div>}
      
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