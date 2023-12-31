import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Loadable from '../components/Loadable';
import { routerPath } from '@App/configs/routerConfig';

const ProductPage = Loadable(lazy(() => import('@App/pages/Admin/Product')));
const SaveProduct = Loadable(lazy(() => import('@App/pages/Admin/Product/SaveProduct')));

const Size = Loadable(lazy(() => import('@App/pages/Admin/Size')));
const CreateSize = Loadable(lazy(() => import('@App/pages/Admin/Size/CreateSize')));
const UpdateSize = Loadable(lazy(() => import('@App/pages/Admin/Size/UpdateSize')));

const Color = Loadable(lazy(() => import('@App/pages/Admin/Color')));
const CreateColor = Loadable(lazy(() => import('@App/pages/Admin/Color/CreateColor')));
const UpdateColor = Loadable(lazy(() => import('@App/pages/Admin/Color/UpdateColor')));
const Comment = Loadable(lazy(() => import('@App/pages/Admin/Comment')));

const productRouter = {
   path: routerPath.PRODUCTS,
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
         path: 'save',
         element: <SaveProduct />
      },
      {
         path: routerPath.SIZE,
         element: <Outlet />,
         children: [
            {
               index: true,
               element: <Size />
            },
            {
               path: 'create',
               element: <CreateSize />
            },
            {
               path: ':id',
               element: <UpdateSize />
            }
         ]
      },
      {
         path: routerPath.COLOR,
         element: <Outlet />,
         children: [
            {
               index: true,
               element: <Color />
            },
            {
               path: 'create',
               element: <CreateColor />
            },
            {
               path: ':id',
               element: <UpdateColor />
            }
         ]
      },
      {
         path: 'comment/:id',
         element: <Comment />
      }
   ]
};

export default productRouter;
