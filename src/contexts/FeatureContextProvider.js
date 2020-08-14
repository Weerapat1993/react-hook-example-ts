import React, { useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { store } from '../config/store'

// Feature Context Provider
export const FeatureContextProvider = React.memo(({ children, name }) => {
  const AppContext = store.context(name)
  const AppDispatchContext = store.dispatch(name)
  const [state, dispatch] = useImmerReducer(store.reducer[name], store.initialState[name])
  return (
    <AppContext.Provider value={state} displayName={`${name}_context`}>
      <AppDispatchContext.Provider value={dispatch} displayName={`${name}_dispatch_context`} >
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  )
})

// Custom Hooks
const useSelector = (reducerName, callback) => {
  const state = useContext(store.context(reducerName));
  return callback(state)
}

const useDispatch = (reducerName) => {
  const dispatch = useContext(store.dispatch(reducerName));
  return dispatch;
}

export {
  useSelector,
  useDispatch,
}

