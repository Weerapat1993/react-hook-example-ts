import React, { useContext, createContext, useState } from 'react';
import { useImmerReducer } from 'use-immer';

const initialConfigureStore = {
  context: () => createContext({}),
  dispatch: () => createContext({}),
  initialState: {},
  reducer: {},
}

const StoreContext = createContext(initialConfigureStore)

// Feature Context Provider
export const FeatureContextProvider = React.memo(({ children, name, store }) => {
  const [myStore] = useState(store);
  const AppContext = store.context(name)
  const AppDispatchContext = store.dispatch(name)
  const [state, dispatch] = useImmerReducer(store.reducer[name], store.initialState[name])
  return (
    <StoreContext.Provider value={myStore}>
      <AppContext.Provider value={state} displayName={`${name}_context`}>
        <AppDispatchContext.Provider value={dispatch} displayName={`${name}_dispatch_context`} >
          {children}
        </AppDispatchContext.Provider>
      </AppContext.Provider>
    </StoreContext.Provider>
  )
})

FeatureContextProvider.defaultProps = {
  name: 'app',
  store: initialConfigureStore
}

// Custom Hooks
const useSelector = (reducerName, callback) => {
  const myStore = useContext(StoreContext)
  const state = useContext(myStore.context(reducerName));
  return callback(state)
}

const useDispatch = (reducerName) => {
  const myStore = useContext(StoreContext)
  const dispatch = useContext(myStore.dispatch(reducerName));
  return dispatch;
}

export {
  useSelector,
  useDispatch,
}

