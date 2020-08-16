import React from 'react';
import { useSelector, useDispatch } from './index'

export const connect = (mapStateToProps, mapDispatchToProps) => (WrapperComponent) => {
  const Connect = (props) => {
    const state = mapStateToProps && typeof mapStateToProps === 'function' ? mapStateToProps(useSelector, props) : {}
    const dispatch = mapDispatchToProps && typeof mapDispatchToProps === 'function' ? mapDispatchToProps(useDispatch, props) : {}
    return <WrapperComponent {...state} {...dispatch} {...props} /> 
  }
  return Connect;
}