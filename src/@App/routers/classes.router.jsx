import { routerPath } from '@App/configs/routerConfig';
import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Loadable from './components/Loadable';

const Classes = Loadable(lazy(() => import('@App/pages/Classes')));
const CreateClasses = Loadable(lazy(() => import('@App/pages/Classes/CreateClasses')));
const UpdateClasses = Loadable(lazy(() => import('@App/pages/Classes/UpdateClasses')));
const classesRouter = {
   path: routerPath.CLASSES,
   element: (
      // <PermissionRestricted >
      <Outlet />
      //  </PermissionRestricted>
   ),
   children: [
      {
         index: true,
         element: <Classes />
      },
      {
         path: 'create',
         element: <CreateClasses />
      },
      {
         path: 'update/:id',
         element: <UpdateClasses />
      }
   ]
};

export default classesRouter;
