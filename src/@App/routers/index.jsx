// import { lazy } from "react";
import { lazy } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import Loadable from './components/Loadable';

import AdminLayout from '@App/components/layouts/admin';
import CommonLayout from '@App/components/layouts/common';

import PublicRouter from './components/PublicRouter';
import PrivateRouter from './components/PrivateRouter';
import Home from '@App/pages/Admin/Home';

// const Signin = Loadable(lazy(() => import('@App/pages/Signin')));
// const GetCurrentUser = lazy(() => import('@App/pages/Signin/GetCurrentUser'));

const routers = [
   {
      path: 'signin',
      element: <PublicRouter />,
      children: [
         // {
         //    index: true,
         //    element: <Signin />
         // },
         // {
         //    path: 'success',
         //    element: <GetCurrentUser />
         // }
      ]
   },
   {
      path: '/',
      element: (
         // <PrivateRouter>
         <CommonLayout />
         // </PrivateRouter>
      ),
      children: [
         {
            index: true,
            element: <Home />
         }
      ]
   },
   {
      path: '/admin',
      element: (
         // <PrivateRouter>
         <AdminLayout />
         // </PrivateRouter>
      ),
      children: [
         {
            index: true,
            element: <Outlet />
         },
      ]
   }
];

export default function Routers() {
   console.log('router run');
   return useRoutes(routers);
}
