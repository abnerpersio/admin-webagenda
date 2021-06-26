import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';

import CommonStyles from './styles/themes/common';

import Layout from './components/Layout';

export default function App() {
  return (
    <ThemeProvider theme={CommonStyles} >
      <GlobalStyle />
      <Layout />
    </ThemeProvider>
  );
}
