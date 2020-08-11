import { createContext } from 'react'

export const initialState = {
  keys: {}
}

export const createReducerStores = (reducerNames) => {
  const contextStore = {};
  const dispatchStore = {};
  reducerNames.forEach(name => {
    contextStore[name] = createContext(initialState);
    dispatchStore[name] = createContext()
  })
  return {
    contextStore,
    dispatchStore,
  }
}