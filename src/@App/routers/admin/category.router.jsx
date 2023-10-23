import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Loadable from '../components/Loadable';
import { routerPath } from '@App/configs/routerConfig';

const Categories = Loadable(lazy(() => import('@App/pages/Admin/Categories')));
const CreateCategory = Loadable(lazy(() => import('@App/pages/Admin/Categories/CreateCategory')));
const UpdateCategory = Loadable(lazy(() => import('@App/pages/Admin/Categories/UpdateCategory')));

const categoryRouter = {
    path: routerPath.CATEGORYPRODUCTS,
    element: (
        // <PermissionRestricted >
        <Outlet />
        //  </PermissionRestricted>
    ),
    children: [
        {
            index: true,
            element: <Categories />
        },
        {
            path: 'create',
            element: <CreateCategory />
        },
        {
            path: ':id',
            element: <UpdateCategory />
        }
    ]
};

export default categoryRouter;
