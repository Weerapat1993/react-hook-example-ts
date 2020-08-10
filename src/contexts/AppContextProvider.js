import React, { useReducer } from 'react';
import { initialStore, mainReducer } from '../config/store';

// Context API
export const AppContext = React.createContext(initialStore)

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialStore)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}