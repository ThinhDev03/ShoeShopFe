import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Loadable from '../components/Loadable';
import { routerPath } from '@App/configs/routerConfig';

const Voucher = Loadable(lazy(() => import('@App/pages/Admin/Voucher')));

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
      }
   ]
};

export default voucherRouter;
