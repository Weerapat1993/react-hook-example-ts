import { createContext } from "react"
import produce from "immer"

/**
 * @typedef {Object} ConfigStore
 * @property {Object} initialState
 * @property {Object} reducer
 */

/**
 * @typedef {Object} CreateSlice
 * @property {String} name
 * @property {Object} initialState
 * @property {Object} reducers
 */

/**
 * @typedef {Object} Slice
 * @property {Object} actions
 * @property {Object} initialState
 * @property {Function} reducer
 */

/**
 * Create Slice
 * @param {CreateSlice} config
 * @returns {Slice}
 */
export const createSlice = (config) => {
  const { name, initialState, reducers } = config
  const actions = {}
  Object.keys(reducers).forEach(key => {
    const actionTypes = `${name}/${key}`
    actions[key] = payload => ({ type: actionTypes, payload })
  })
  const reducer = produce((state = initialState, action) => {
    Object.keys(reducers).forEach(key => {
      const actionTypes = `${name}/${key}`
      if(action.type === actionTypes) {
        reducers[key](state, action)
      }
    })
  })
  return {
    name,
    initialState,
    actions,
    reducer,
  }
}

export const querySlice = (name) => createSlice({
  name,
  initialState: {
    keys: {}
  },
  reducers: {
    request: (state, action) => {
      const { key } = action.payload
      if(!state.keys[key]) {
        state.keys[key] = {};
      }
      state.keys[key].loading = true;
      state.keys[key].isLoaded = false;
      state.keys[key].error = ''
    },
    success: (state, action) => {
      const { key, data } = action.payload
      if(!state.keys[key]) {
        state.keys[key] = {};
      }
      state.keys[key].loading = false;
      state.keys[key].isLoaded = true;
      state.keys[key].data = data;
      state.keys[key].error = ''
    },
    failure: (state, action) => {
      const { key, error } = action.payload
      if(!state.keys[key]) {
        state.keys[key] = {};
      }
      state.keys[key].loading = false;
      state.keys[key].isLoaded = false;
      state.keys[key].error = error.message;
    },
  },
});

/**
 * Configure Store
 * @param {ConfigStore} config 
 */
export const configureStore = (config) => {
  const { reducer, initialState } = config;
  const reducerNames = Object.keys(reducer).map(key => key)
  const ContextStore = {};
  const DispatchStore = {};
  reducerNames.forEach(name => {
    ContextStore[name] = createContext(initialState[name]);
    DispatchStore[name] = createContext()
  })
  const Context = (name) => ContextStore[name]
  const Dispatch = (name) => DispatchStore[name]
  return {
    Context,
    Dispatch,
    initialState,
    reducer,
  }
}