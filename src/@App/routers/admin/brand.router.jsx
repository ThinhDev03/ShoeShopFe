import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Loadable from '../components/Loadable';
import { routerPath } from '@App/configs/routerConfig';

const Brand = Loadable(lazy(() => import('@App/pages/Admin/Brand')));
const CreateBrand = Loadable(lazy(() => import('@App/pages/Admin/Brand/CreateBrand')));
const UpdateBrand = Loadable(lazy(() => import('@App/pages/Admin/Brand/UpdateBrand')));

const brandRouter = {
    path: routerPath.BRAND,
    element: (
        // <PermissionRestricted >
        <Outlet />
        //  </PermissionRestricted>
    ),
    children: [
        {
            index: true,
            element: <Brand />
        },
        {
            path: 'create',
            element: <CreateBrand />
        },
        {
            path: ':id',
            element: <UpdateBrand />
        }
    ]
};

export default brandRouter;
