
import React, { Fragment, useRef, useMemo } from 'react';
import isEmpty from 'lodash/isEmpty'
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
  const { user, refetch } = useUser(fetchByUserId);
  const { data, loading, error } = user(userSelectKey)
  const isLoaded = useMemo(() => user(inputValue, 'isLoaded', false), [user, inputValue])
  const isData = !isEmpty(data);
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
        {isData && (
          <Button onClick={() => refetch(userSelectKey)}>
            Refetch
          </Button>
        )}
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
              <li>ID: {data.id}</li>
              <li>Name: {data.name}</li>
              <li>Email: {data.email}</li>
              <li>Phone: {data.phone}</li>
              <li>Website: {data.website}</li>
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