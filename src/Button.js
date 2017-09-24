import React from 'react'
import { withTheme } from './ThemeProvider'

export class Button extends React.Component {
  render() {
    const style = {
      backgroundColor: this.context.theme.color
    };

    return <button style={style}>ok</button>;
  }
}

export default withTheme(Button)