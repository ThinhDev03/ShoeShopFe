import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '@App/App';
import store from '@App/redux/store';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@Core/theme';
import ErrorBoundary from '@App/components/customs/ErrorBoundary';
import GlobalBaseline from '@App/components/customs/GlobalBaseline';
import InitialApp from '@App/components/customs/InitialApp';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const theme = createTheme();
ReactDOM.createRoot(document.getElementById('root')).render(
   <ErrorBoundary>
      <GlobalBaseline />
      <QueryClientProvider client={queryClient}>
         <Provider store={store}>
            <InitialApp>
               <ThemeProvider theme={theme}>
                  <App />
               </ThemeProvider>
            </InitialApp>
         </Provider>
      </QueryClientProvider>
   </ErrorBoundary>
);
