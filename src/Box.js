import React from 'react'
import { withTheme } from './ThemeProvider'


export const Box = (props, context) => {
  const color = context.theme.color
  const style = {
    backgroundColor: color,
    height: '20px'
  }

  return (
    <div style={style}>{color}</div>
  )
}


export default withTheme(Box)