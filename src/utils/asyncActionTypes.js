
/**
 * Async Action Type
 * @param {String} type 
 */
export const asyncActionTypes = (type) => ({
  REQUEST: `${type}_REQUEST`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`,
})