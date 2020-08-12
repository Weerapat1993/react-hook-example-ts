import { querySlice } from '../../../utils/tools/reduxToolkit'

export const userSlice = querySlice('user')

export const { request, success, failure } = userSlice.actions;