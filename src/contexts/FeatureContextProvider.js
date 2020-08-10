import React, { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import get from 'lodash/get';
import { createSelectorCreator, defaultMemoize } from 'reselect'
import isEqual from 'lodash/isEqual'
import { postSlice, userSlice } from '../config/store';

// create a "selector creator" that uses lodash.isEqual instead of ===
const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
)

const initialState = {
  keys: {}
}

// Context
const UserDispatchContext = createContext()
const PostDispatchContext = createContext()
const UserContext = createContext(userSlice.initialState)
const PostContext = createContext(postSlice.initialState)

const contextStore = {
  post: PostContext,
  user: UserContext,
}

const dispatchStore = {
  post: UserDispatchContext,
  user: PostDispatchContext,
}

const rootReducer = {
  post: postSlice.reducer,
  user: userSlice.reducer,
};

// Feature Context Provider
export const FeatureContextProvider = ({ children, name }) => {
  const AppContext = contextStore[name]
  const AppDispatchContext = dispatchStore[name]
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
  const state = useContext(contextStore[reducerName]);
  const defaultState = {
    loading: false,
    error: '',
    isLoaded: false,
    data: [], 
  }
  return createDeepEqualSelector(
    (key) => get(state, `keys.${key}`, defaultState),
    (value) => value
  )
}

const useDispatch = (reducerName) => {
  const dispatch = useContext(dispatchStore[reducerName]);
  return dispatch;
}

export {
  useSelector,
  useDispatch,
}

