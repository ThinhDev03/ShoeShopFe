import { routerPath } from '@App/configs/routerConfig';
import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Loadable from './components/Loadable';

const ProductPage = Loadable(lazy(() => import('@App/pages/Product')));
const productRouter = {
   path: routerPath.PRODUCT,
   element: (
      // <PermissionRestricted >
      <Outlet />
      //  </PermissionRestricted>
   ),
   children: [
      {
         index: true,
         element: <ProductPage />
      },
      {
         path: 'create',
         element: <></>
      },
      {
         path: 'update/:id',
         element: <></>
      }
   ]
};

export default productRouter;
