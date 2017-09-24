import React from 'react'
import PropTypes from 'prop-types'

const ThemeContext = {
  color: PropTypes.string
}

class ThemeProvider extends React.Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
    this.unregister = this.unregister.bind(this)
    this.subscriptions = []
  }

  register(component, cb) {
    this.subscriptions.push([component, cb])
  }

  unregister(component, cb) {
    this.subscriptions = this.subscriptions.filter(([a, b]) => component !== a)

  }

  componentWillReceiveProps(nextProps) {
    this.subscriptions.map(([compoent, cb]) => cb())
  }

  getChildContext() {
    return {
      theme: {
        color: this.props.color
      },
      register: this.register,
      unregister: this.unregister,
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

ThemeProvider.childContextTypes = {
  theme: ThemeContext,
  unregister: PropTypes.func,
  register: PropTypes.func
};



// This function takes a component...
export function withTheme(WrappedComponent, selectData) {
  // ...and returns another component...
  WrappedComponent.contextTypes = {
    theme: PropTypes.shape(ThemeContext).isRequired
  };

  const ThemedClass = class extends React.Component {
    constructor(props) {
      super(props);
      this.forceUpdate = this.forceUpdate.bind(this);
    }

    componentDidMount() {
      this.context.register(this, this.forceUpdate);
    }

    componentWillUnmount() {
      this.context.unregister(this, this.forceUpdate);
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent {...this.props} />;
    }
  };
  ThemedClass.contextTypes = {
    register: PropTypes.func.isRequired,
    unregister: PropTypes.func.isRequired
  }
  return ThemedClass;
}

export default ThemeProvider