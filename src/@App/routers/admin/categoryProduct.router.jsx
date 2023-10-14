import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Loadable from '../components/Loadable';
import { routerPath } from '@App/configs/routerConfig';

const CategoryProduct = Loadable(lazy(() => import('@App/pages/Admin/CategoryProduct')));
const CreateCategoryProduct = Loadable(lazy(() => import('@App/pages/Admin/CategoryProduct/CreateCategoryProduct')));
// const UpdateClasses = Loadable(lazy(() => import('@App/pages/Admin/Classes/UpdateClasses')));

const categoryProductRouter = {
   path: routerPath.CATEGORYPRODUCTS,
   element: (
      // <PermissionRestricted >
      <Outlet />
      //  </PermissionRestricted>
   ),
   children: [
      {
         index: true,
         element: <CategoryProduct />
      },
      {
         path: 'create',
         element: <CreateCategoryProduct />
      }
      //   {
      //      path: 'update/:id',
      //      element: <UpdateClasses />
      //   }
   ]
};

export default categoryProductRouter;
