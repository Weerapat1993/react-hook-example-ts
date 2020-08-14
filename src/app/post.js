import axios from 'axios';
import get from 'lodash/get'
import { createSelector } from 'reselect';
import { querySlice } from '../utils/use-codex'

const defaultState = {
  loading: false,
  error: '',
  isLoaded: false,
  data: [], 
}

export const postSlice = querySlice('post')

export const { request, success, failure } = postSlice.actions;

// Async Action
export const fetchPostByUserId = (key) => (dispatch) => {
  dispatch(request({ key }));
  return axios(`https://jsonplaceholder.typicode.com/posts?userId=${key}`)
    .then(({ data }) => dispatch(success({ data, key })))
    .catch(error => dispatch(failure({ error })))
}

// Selector
export const selectPostByUserId = createSelector(
  state => state.keys,
  (state) => (key, path, defaultValue) => path ? get(state, `${key}.${path}`, defaultValue) : get(state, key, defaultState)
)

// Selector for useMemo
export const makeSelectPostByUserId = () => selectPostByUserId