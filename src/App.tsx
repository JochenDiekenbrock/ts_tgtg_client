import React from 'react';
import { GlobalStyles, theme } from './global-styles';
import { ThemeProvider } from 'styled-components';
import { Main } from './main';
import { SessionProvider } from './session';
import { TransientSessionProvider } from './transient-session';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <TransientSessionProvider>
          <GlobalStyles />
          <Main />
        </TransientSessionProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default App;
