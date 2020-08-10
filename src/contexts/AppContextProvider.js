import React, { useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { initialStore, mainReducer } from '../config/store';
import get from 'lodash/get';
import { createSelectorCreator, defaultMemoize } from 'reselect'
import isEqual from 'lodash/isEqual'

// create a "selector creator" that uses lodash.isEqual instead of ===
const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
)

// Context API
export const AppContext = React.createContext(initialStore)
export const DispatchContext = React.createContext();

// Context Provider
export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(mainReducer, initialStore)
  // const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return (
    <AppContext.Provider value={state} displayName="State Context">
      <DispatchContext.Provider value={dispatch} displayName="Dispatch Context">
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
    (key) => get(state, `${reducerName ? `${reducerName}.` : ''}keys.${key}`, defaultState),
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
