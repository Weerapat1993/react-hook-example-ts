import { FETCH_POST_BY_USER_ID } from "../../../constants/actionTypes";
import { reducerCreator } from "../../../utils/reducerCreator";

export const initialState = {
  keys: {},
}


export const postReducer = (state = initialState, action) => {
  const { type } = action
  const { setStateWithKeyRequest, setStateWithKeySuccess, setStateWithKeyFailure } = reducerCreator(state, action)
  switch (type) {
    case FETCH_POST_BY_USER_ID.REQUEST:
      return setStateWithKeyRequest();
    case FETCH_POST_BY_USER_ID.SUCCESS:
      return setStateWithKeySuccess({ data: action.data });
    case FETCH_POST_BY_USER_ID.FAILURE:
      return setStateWithKeyFailure({ error: action.error.message });
    default:
      throw new Error();
  }
};

