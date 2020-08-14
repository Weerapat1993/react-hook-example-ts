import axios from 'axios'
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

// Async Action
export const fetchUserById = (key) => (dispatch) => {
  dispatch(request({ key }));
  return axios(`https://jsonplaceholder.typicode.com/users/${key}`)
    .then(({ data }) => dispatch(success({ data, key })))
    .catch(error => dispatch(failure({ error, key })))
}

// Selector
export const selectUserById = createSelector(
  state => state.keys,
  (state) => (key, path, defaultValue) => path ? get(state, `${key}.${path}`, defaultValue) : get(state, key, defaultState)
)

// Selector for useMemo
export const makeSelectUserById = () => selectUserById