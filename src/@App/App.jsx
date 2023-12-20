import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './routers';
import './index.css';
import ToastMessage from '../@Core/Components/FormControl/ToastMessage';
import CoreConfirmProvider from '@Core/Components/Confirm/CoreConfirm';
import useAuth from './hooks/useAuth';
import LazyLoadingFullScreen from './components/customs/LazyLoadingFullScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AutoScrollToTop from './components/customs/AutoScrollToTop';

function App() {
   const { isInitialized } = useAuth();
   if (!isInitialized) return <LazyLoadingFullScreen />;
   return (
      <CoreConfirmProvider>
         <Router>
            <Routers />
            <AutoScrollToTop />
         </Router>
         <ToastContainer />
         <ToastMessage />
      </CoreConfirmProvider>
   );
}

export default App;
