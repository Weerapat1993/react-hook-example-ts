export const createActions = (ACTION_TYPE, key) => ({
  request: () => ({ type: ACTION_TYPE.REQUEST, key }),
  success: (data) => ({ type: ACTION_TYPE.SUCCESS, data, key }),
  failure: (error) => ({ type: ACTION_TYPE.FAILURE, error, key }),
})