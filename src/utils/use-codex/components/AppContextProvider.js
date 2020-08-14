import React, { useContext } from 'react';
import { oneOfType, node, arrayOf } from 'prop-types'
import { useImmerReducer } from 'use-immer';
import { postSlice } from '../features/post/redux/postSlice'
import { userSlice } from '../features/user/redux/userSlice'

const initialConfigureStore = {
  initialState: {},
  reducer: {},
}

// Combine Reducer
export const mainReducer = (state, action) => ({
  post: postSlice.reducer(state.post, action),
  user: userSlice.reducer(state.user, action),
});

// Context API
export const AppContext = React.createContext({})
export const DispatchContext = React.createContext();

// Context Provider
export const Provider = React.memo(({ children, store }) => {
  const [state, dispatch] = useImmerReducer(mainReducer, store.initialState)
  // const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return (
    <AppContext.Provider value={state} displayName="App State Context">
      <DispatchContext.Provider value={dispatch} displayName="App Dispatch Context">
        {children}
      </DispatchContext.Provider>
    </AppContext.Provider>
  )
})

Provider.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]),
}

Provider.defaultProps = {
  store: initialConfigureStore,
  children: null,
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
