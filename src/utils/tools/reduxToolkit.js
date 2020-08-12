import produce from "immer"

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