import React, { useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import get from 'lodash/get';
import { initialStore, mainReducer } from '../config/store';
import { createDeepEqualSelector } from '../utils/reselect';

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
const useSelector = (reducerName) => {
  const state = useContext(AppContext);
  const defaultState = {
    loading: false,
    error: '',
    isLoaded: false,
    data: [], 
  }
  return createDeepEqualSelector(
    (key, path, defaultValue) => path ? get(state, `${reducerName ? `${reducerName}.` : ''}keys.${key}.${path}`, defaultValue) : get(state, `${reducerName ? `${reducerName}.` : ''}keys.${key}`, defaultState),
    (value) => value
  )
}

const useDispatch = () => {
  const dispatch = useContext(DispatchContext);
  return dispatch;
}

export {
  useSelector,
  useDispatch,
}
