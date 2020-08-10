import React, { useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { initialStore, mainReducer } from '../config/store';
// import { configLogger } from '../config/logger';

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
const useStore = () => {
  const state = useContext(AppContext);
  return state
}
const useDispatch = () => {
  const dispatch = useContext(DispatchContext);
  return dispatch;
}

const getState = useStore;
export {
  getState,
  useDispatch,
}
