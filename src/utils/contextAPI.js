import { createContext } from 'react'

export const initialState = {
  keys: {}
}

const Store = (context) => ({
  state: createContext(initialState),
  dispatch: createContext(),
})

export const createReducerStores = (reducerNames) => {
  const dispatch = reducerNames;
  const contexts = reducerNames;
  const contextStore = contexts.reduce((pre, cur) => {
    return {
      ...pre,
      [cur]: Store().state,
    }
  }, {});
  const dispatchStore = dispatch.reduce((pre, cur) => {
    return {
      ...pre,
      [cur]: Store().dispatch,
    }
  }, {});
  return {
    contextStore,
    dispatchStore,
  }
}