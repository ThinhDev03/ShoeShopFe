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
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';

const queryClient = new QueryClient();
focusManager.setFocused(false);
const theme = createTheme();
ReactDOM.createRoot(document.getElementById('root')).render(
   <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
         <Provider store={store}>
            <InitialApp>
               <ThemeProvider theme={theme}>
                  <GlobalBaseline />
                  <App />
               </ThemeProvider>
            </InitialApp>
         </Provider>
      </QueryClientProvider>
   </ErrorBoundary>
);
