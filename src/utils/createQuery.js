import get from 'lodash/get';
import { createSelectorCreator, defaultMemoize } from 'reselect'
import produce from 'immer';
import isEqual from 'lodash/isEqual'
// import { reducerCreator } from "./reducerCreator";

// create a "selector creator" that uses lodash.isEqual instead of ===
const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
)

export const createQuery = (ACTION_TYPE) => {
  const initialState = {
    keys: {},
  }
  return {
    initialState,
    reducer: produce((state = initialState, action) => {
      const { type, key } = action
      // const { setStateWithKeyRequest, setStateWithKeySuccess, setStateWithKeyFailure } = reducerCreator(state, action)
      switch (type) {
        case ACTION_TYPE.REQUEST: {
          if(!state.keys[key]) {
            state.keys[key] = {};
          }
          state.keys[key].loading = true;
          state.keys[key].isLoaded = false;
          state.keys[key].error = ''
          return;
        }
        case ACTION_TYPE.SUCCESS: {
          if(!state.keys[key]) {
            state.keys[key] = {};
          }
          state.keys[key].loading = false;
          state.keys[key].isLoaded = true;
          state.keys[key].data = action.data;
          state.keys[key].error = ''
          return;
        }
        case ACTION_TYPE.FAILURE: {
          if(!state.keys[key]) {
            state.keys[key] = {};
          }
          state.keys[key].loading = false;
          state.keys[key].isLoaded = false;
          state.keys[key].error = action.error;
          return;
        }
        // case ACTION_TYPE.REQUEST:
        //   return setStateWithKeyRequest();
        // case ACTION_TYPE.SUCCESS:
        //   return setStateWithKeySuccess({ data: action.data });
        // case ACTION_TYPE.FAILURE:
        //   return setStateWithKeyFailure({ error: action.error.message });
        default: {
          return;
        }
          // return state;
      }
    })
  }
}

export const createActions = (ACTION_TYPE, key) => ({
  request: () => ({ type: ACTION_TYPE.REQUEST, key }),
  success: (data) => ({ type: ACTION_TYPE.SUCCESS, data, key }),
  failure: (error) => ({ type: ACTION_TYPE.FAILURE, error, key }),
})

export const createReducer = (ACTION_TYPE) => {
  const { reducer, initialState } = createQuery(ACTION_TYPE)
  return [reducer, initialState]
}

// export const createSelector = (state, key) => get(state, `keys.${key}`, {
//   loading: false,
//   error: '',
//   isLoaded: false,
//   data: [], 
// })

export const createSelector = createDeepEqualSelector(
  (state, key, reducerName) => get(state, `${reducerName ? `${reducerName}.` : ''}keys.${key}`, {
    loading: false,
    error: '',
    isLoaded: false,
    data: [], 
  }),
  value => value
)