import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalStyle from '../../styles/global';

import CommonStyles from '../../styles/themes/common';

import Routes from '../../routes';
import AuthProvider from '../../context/AuthProvider';

import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={CommonStyles}>
            <GlobalStyle />
            <Routes />

            <ToastContainer />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
