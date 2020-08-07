import get from 'lodash/get';
import { reducerCreator } from "./reducerCreator";

export const createQuery = (ACTION_TYPE) => {
  const initialState = {
    keys: {},
  }
  const selector = (state, key) => get(state, `keys.${key}`, {
    loading: false,
    error: '',
    isLoaded: false,
    data: [], 
  })
  return {
    initialState,
    selector,
    reducer: (state = initialState, action) => {
      const { type } = action
      const { setStateWithKeyRequest, setStateWithKeySuccess, setStateWithKeyFailure } = reducerCreator(state, action)
      switch (type) {
        case ACTION_TYPE.REQUEST:
          return setStateWithKeyRequest();
        case ACTION_TYPE.SUCCESS:
          return setStateWithKeySuccess({ data: action.data });
        case ACTION_TYPE.FAILURE:
          return setStateWithKeyFailure({ error: action.error.message });
        default:
          throw new Error();
      }
    }
  }
}