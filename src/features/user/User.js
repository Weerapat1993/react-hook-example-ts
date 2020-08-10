
import React, { useState, Fragment } from 'react';
import { useUserList } from './hooks/useUserList'

function User({ userId }) {
  const [inputValue, setInput] = useState(userId);
  const [fetchByUserId, setFetchByUserId] = useState(userId);
  const [userSelectKey, setUserSelectKey] = useState(userId);
  const { user } = useUserList(fetchByUserId);
  const { data, loading, error } = user(userSelectKey)
  const handleUser = () => {
    const { isLoaded } = user(inputValue);
    setUserSelectKey(inputValue)
    if(inputValue && !isLoaded) {
      setFetchByUserId(inputValue)
    }
  }
  console.log('User, render');
  return (
    <div>
      <h2>User</h2>
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
              <li>Name: {data.name}</li>
              <li>Email: {data.email}</li>
              <li>Phone: {data.phone}</li>
            </ul>
          )}
        </Fragment>
      )}
    </div>
  );
}

User.defaultProps = {
  userId: 0,
}

export default React.memo(User);