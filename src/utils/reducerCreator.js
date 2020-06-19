
export const reducerCreator = (state, action) => {
  const { key } = action
  const setState = (newState) => ({
    ...state,
    ...newState,
  })

  const setStateWithKey = (newState) => setState({
    keys: {
      ...state.keys,
      [key]: {
        ...state.keys[key],
        ...newState
      },
    }
  })

  const setStateWithKeyRequest = (newState) => setStateWithKey({
    loading: true,
    isLoaded: false,
    error: '',
    ...newState,
  })

  const setStateWithKeySuccess = (newState) => setStateWithKey({
    loading: false,
    isLoaded: true,
    error: '',
    ...newState,
  })

  const setStateWithKeyFailure = (newState) => setStateWithKey({
    loading: false,
    isLoaded: false,
    ...newState,
  })

  return {
    setState,
    setStateWithKey,
    setStateWithKeyRequest,
    setStateWithKeySuccess,
    setStateWithKeyFailure,
  }
}