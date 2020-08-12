import get from 'lodash/get'
import { createSelector } from 'reselect';
import { querySlice } from '../../../utils/tools/reduxToolkit'

const defaultState = {
  loading: false,
  error: '',
  isLoaded: false,
  data: [], 
}

export const userSlice = querySlice('user')

export const { request, success, failure } = userSlice.actions;

// Selector
export const selectUserById = createSelector(
  state => state.keys,
  (state) => (key, path, defaultValue) => path ? get(state, `${key}.${path}`, defaultValue) : get(state, key, defaultState)
)

// Selector for useMemo
export const makeSelectUserById = () => selectUserById