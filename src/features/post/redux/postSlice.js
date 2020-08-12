import { querySlice } from '../../../utils/tools/reduxToolkit'

export const postSlice = querySlice('post')

export const { request, success, failure } = postSlice.actions;