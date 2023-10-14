// import { lazy } from "react";
import { lazy } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import Loadable from './components/Loadable';
import classesRouter from './classes.router';
import PublicRouter from './components/PublicRouter';
import AdminLayout from '@App/components/layouts/admin';
import PrivateRouter from './components/PrivateRouter';

import productRouter from './product.router';
import CommonLayout from '@App/components/layouts/common';

const Home = Loadable(lazy(() => import('@App/pages/Home')));
const Signin = Loadable(lazy(() => import('@App/pages/Signin')));
const GetCurrentUser = lazy(() => import('@App/pages/Signin/GetCurrentUser'));

const routers = [
   {
      path: 'signin',
      element: <PublicRouter />,
      children: [
         {
            index: true,
            element: <Signin />
         },
         {
            path: 'success',
            element: <GetCurrentUser />
         }
      ]
   },
   {
      path: '/',
      element: (
         // <PrivateRouter>
         <CommonLayout />
         // </PrivateRouter>
      )
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
         classesRouter,
         productRouter
      ]
   }
];

export default function Routers() {
   console.log('router run');
   return useRoutes(routers);
}
