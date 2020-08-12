import React, { useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { postSlice } from '../features/post/redux/postSlice'
import { userSlice } from '../features/user/redux/userSlice'

// Initial Store
export const initialStore = {
  post: postSlice.initialState,
  user: userSlice.initialState,
}

// Combine Reducer
export const mainReducer = (state, action) => ({
  post: postSlice.reducer(state.post, action),
  user: userSlice.reducer(state.user, action),
});


// Context API
export const AppContext = React.createContext(initialStore)
export const DispatchContext = React.createContext();

// Context Provider
export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(mainReducer, initialStore)
  // const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return (
    <AppContext.Provider value={state} displayName="App State Context">
      <DispatchContext.Provider value={dispatch} displayName="App Dispatch Context">
        {children}
      </DispatchContext.Provider>
    </AppContext.Provider>
  )
}

// Custom Hooks
const useSelector = (reducerName, callback) => {
  const state = useContext(AppContext);
  return callback(state[reducerName])
}

const useDispatch = () => {
  const dispatch = useContext(DispatchContext);
  return dispatch;
}

export {
  useSelector,
  useDispatch,
}
