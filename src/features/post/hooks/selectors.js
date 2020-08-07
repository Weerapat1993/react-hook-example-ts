import get from 'lodash/get'

export const postSelector = (state, key) => get(state, `keys.${key}`, {
  loading: false,
  error: '',
  isLoaded: false,
  data: [], 
})