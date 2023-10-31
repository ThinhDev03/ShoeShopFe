import { routerPath } from '@App/configs/routerConfig';
import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Loadable from '../components/Loadable';
import { ROLE } from '@App/configs/role';
import PermissionRestricted from '../components/PermissionRestricted';
import UpdateUser from '@App/pages/Admin/User/UpdateUser';

const Bill = Loadable(lazy(() => import('@App/pages/Admin/Bill')));
const UpdateBill = Loadable(lazy(() => import('@App/pages/Admin/Bill/UpdateBill')));
// const UpdateBill = Loadable(lazy(() => import('@App/pages/Admin/User/UpdateUser')));
// const CreateUser = Loadable(lazy(() => import('@App/pages/Admin/User/CreateUser')));

const billRouter = {
   path: routerPath.BILL,
   element: (
      // <PermissionRestricted roleNames={[ROLE[1], ROLE[2]]} path={routerPath.USER}>
      <Outlet />
      // </PermissionRestricted>
   ),
   children: [
      {
         index: true,
         element: <Bill />
      },
      {
         path: 'update/:id',
         element: <UpdateBill />
      }
   ]
};

export default billRouter;
