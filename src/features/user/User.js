
import React, { Fragment, useRef } from 'react';
import { useImmer } from 'use-immer'
import { useUser } from './hooks/useUser'
import { Button } from '../../components/Button';

function User({ userId }) {
  const count = useRef(0)
  const [state, setState] = useImmer({
    inputValue: userId,
    fetchByUserId: userId,
    userSelectKey: userId,
  })
  const { fetchByUserId, inputValue, userSelectKey } = state;
  const { user } = useUser(fetchByUserId);
  const data = user(userSelectKey, 'data', [])
  const loading = user(userSelectKey, 'loading', false)
  const error = user(userSelectKey, 'error', '')
  const handleUser = () => {
    const isLoaded = user(inputValue, 'isLoaded', false);
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
  console.log('User, render', count.current++);
  return (
    <div>
      <h2>User</h2>
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

      {error && <div>{error}</div>}
      
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