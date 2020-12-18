import React from 'react';
import { theme } from './global-styles';
import { ThemeProvider } from 'styled-components';
import { Fetch } from './Fetch';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Fetch />
    </ThemeProvider>
  );
}

export default App;
