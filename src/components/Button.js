import React from 'react';

export const Button = ({ ...rest }) => {
  // console.log('Button Render')
  return (
    <button {...rest} />
  )
}