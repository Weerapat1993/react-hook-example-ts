import React, { useReducer } from 'react';
import { initialStore, mainReducer } from '../config/store';
import { configLogger } from '../config/logger';

// Context API
export const AppContext = React.createContext(initialStore)

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configLogger(mainReducer), initialStore)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}