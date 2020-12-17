import React from 'react';
import { theme } from './global-styles';
import { ThemeProvider } from 'styled-components';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <h1>Hello World</h1>
    </ThemeProvider>
  );
}

export default App;
