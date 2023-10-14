import { routerPath } from '@App/configs/routerConfig';
import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Loadable from '../components/Loadable';

const Color = Loadable(lazy(() => import('@App/pages/Admin/Color')));
const CreateColor = Loadable(lazy(() => import('@App/pages/Admin/Color/CreateColor')));
const UpdateColor = Loadable(lazy(() => import('@App/pages/Admin/Color/UpdateColor')));


const colorRouter = {
   path: routerPath.PRODUCTS + '/' + routerPath.COLOR,
   element: (
      // <PermissionRestricted >
      <Outlet />
      //  </PermissionRestricted>
   ),
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
         path: 'update/:id',
         element: <UpdateColor />
      }
   ]
};

export default colorRouter;
