import { routerPath } from '@App/configs/routerConfig';
import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Loadable from './components/Loadable';
import { ROLE } from '@App/configs/role';
import PermissionRestricted from './components/PermissionRestricted';
import UpdateUser from '@App/pages/Admin/User/UpdateUser';
import CreateUser from '@App/pages/Admin/User/CreateUser';

const User = Loadable(lazy(() => import('@App/pages/Admin/User')));
// const UpdateUser = Loadable(lazy(() => import('@App/pages/Admin/User/UpdateUser')));
// const CreateUser = Loadable(lazy(() => import('@App/pages/Admin/User/CreateUser')));

const userRouter = {
   path: routerPath.USER,
   element: (
      <PermissionRestricted roleNames={[ROLE[1], ROLE[2]]}>
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
