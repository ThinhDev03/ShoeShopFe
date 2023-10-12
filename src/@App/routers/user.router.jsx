import { routerPath } from '@App/configs/routerConfig';
import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Loadable from './components/Loadable';
import { ROLE } from '@App/configs/role';
import PermissionRestricted from './components/PermissionRestricted';

const User = Loadable(lazy(() => import('@App/pages/User')));
const CreateUser = Loadable(lazy(() => import('@App/pages/User/CreateUser')));
const UpdateUser = Loadable(lazy(() => import('@App/pages/User/UpdateUser')));
const userRouter = {
   path: routerPath.USER,
   element: (
      <PermissionRestricted roleNames={[ROLE[1], ROLE[2]]} path={routerPath.USER}>
         <Outlet />
      </PermissionRestricted>
   ),
   children: [
      {
         index: true,
         element: <User />
      },
      {
         path: 'create',
         element: <CreateUser />
      },
      {
         path: 'update/:id',
         element: <UpdateUser />
      }
   ]
};

export default userRouter;
