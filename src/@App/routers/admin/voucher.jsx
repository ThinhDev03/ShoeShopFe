import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Loadable from '../components/Loadable';
import { routerPath } from '@App/configs/routerConfig';

const Voucher = Loadable(lazy(() => import('@App/pages/Admin/Voucher')));
const CreateVoucher = Loadable(lazy(() => import('@App/pages/Admin/Voucher/CreateVoucher')));
const UpdateVoucher = Loadable(lazy(() => import('@App/pages/Admin/Voucher/UpdateVoucher')));

const voucherRouter = {
   path: routerPath.VOUCHER,
   element: (
      // <PermissionRestricted >
      <Outlet />
      //  </PermissionRestricted>
   ),
   children: [
      {
         index: true,
         element: <Voucher />
      },
      { path: 'create', element: <CreateVoucher /> },
      { path: 'update/:id', element: <UpdateVoucher /> }
   ]
};

export default voucherRouter;
