import { get } from 'lodash'

export const postSelector = (state, key) => get(state, `keys.${key}`, {
  loading: false,
  error: '',
  isLoaded: false,
  data: [], 
})