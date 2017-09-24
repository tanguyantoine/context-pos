import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import ThemeProvider, { withTheme } from "./ThemeProvider";
import ThemedButton from "./Button";
import ThemedBox from "./Box";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "purple" };
  }
  render() {
    const { color } = this.state;
    return (
      <div style={styles}>
        <Hello name="CodeSandbox" />
        <h2>Start editing to see some magic happen {"\u2728"}</h2>
        <button
          onClick={() => {
            this.setState({ color: "green" });
          }}
        >
          green
        </button>
        <button
          onClick={() => {
            this.setState({ color: "blue" });
          }}
        >
          blue
        </button>
        <br />
        <br />
        <ThemeProvider color={color}>
          <ThemedButton />
          <br />
          <br />
          <ThemedBox />
        </ThemeProvider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
