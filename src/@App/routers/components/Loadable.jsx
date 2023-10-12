import LazyLoadingScreen from '@App/components/customs/LazyLoadingScreen';
import { Suspense } from 'react';

const Loadable = (Component) => (props) =>
   (
      <Suspense fallback={<LazyLoadingScreen />}>
         <Component {...props} />
      </Suspense>
   );
export default Loadable;
