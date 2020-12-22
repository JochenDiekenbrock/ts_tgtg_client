import React from 'react';
import { GlobalStyles, theme } from './global-styles';
import { ThemeProvider } from 'styled-components';
import { Main } from './main';
import { SessionProvider } from './session';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <GlobalStyles />
        <Main />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default App;
