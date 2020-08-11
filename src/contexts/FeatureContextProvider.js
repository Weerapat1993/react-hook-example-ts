import React, { useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import get from 'lodash/get';
import { postSlice, userSlice } from '../config/store';
import { createDeepEqualSelector } from '../utils/reselect';
import { createReducerStores, initialState } from '../utils/contextAPI';

// Create Store
const Store = createReducerStores(['post', 'user'])

const rootReducer = {
  post: postSlice.reducer,
  user: userSlice.reducer,
};

// Feature Context Provider
export const FeatureContextProvider = ({ children, name }) => {
  const AppContext = Store.contextStore[name]
  const AppDispatchContext = Store.dispatchStore[name]
  const [state, dispatch] = useImmerReducer(rootReducer[name], initialState)
  return (
    <AppContext.Provider value={state} displayName={`${name}_context`}>
      <AppDispatchContext.Provider value={dispatch} displayName={`${name}_dispatch_context`} >
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  )
}

// Custom Hooks
const useSelector = (reducerName) => {
  const state = useContext(Store.contextStore[reducerName]);
  return createDeepEqualSelector(
    (key, path, defaultValue) => get(state, `keys.${key}.${path}`, defaultValue),
    (value) => value
  )
}

const useDispatch = (reducerName) => {
  const dispatch = useContext(Store.dispatchStore[reducerName]);
  return dispatch;
}

export {
  useSelector,
  useDispatch,
}

