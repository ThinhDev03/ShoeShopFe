import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './routers';
import './index.css';
import ToastMessage from '../@Core/Components/FormControl/ToastMessage';
import CoreConfirmProvider from '@Core/Components/Confirm/CoreConfirm';
import useAuth from './hooks/useAuth';
import LazyLoadingFullScreen from './components/customs/LazyLoadingFullScreen';

function App() {
   const { isInitialized } = useAuth();
   if (!isInitialized) return <LazyLoadingFullScreen />;
   return (
      <CoreConfirmProvider>
         <Router>
            <Routers />
         </Router>
         <ToastMessage />
      </CoreConfirmProvider>
   );
}

export default App;
