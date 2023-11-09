import { lazy } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import AdminLayout from '@App/components/layouts/admin';
import CommonLayout from '@App/components/layouts/common';

import PrivateRouter from './components/PrivateRouter';

import brandRouter from './admin/brand.router';
import productRouter from './admin/product.router';

import categoryRouter from './admin/category.router';
import userRouter from './user.router';
import billRouter from './admin/bill.router';
import clientRoute from './client';
import Home from '@App/pages/Views/Home';

const routers = [
   {
      path: '/',
      element: <CommonLayout />,
      children: [
         {
            index: true,
            element: <Home />
         },
         ...clientRoute
      ]
   },
   {
      path: '/admin',
      element: (
         <PrivateRouter>
            <AdminLayout />
         </PrivateRouter>
      ),
      children: [
         {
            index: true,
            element: <Outlet />
         },
         categoryRouter,
         brandRouter,
         productRouter,
         userRouter,
         billRouter
      ]
   },
   {
      path: '*',
      element: <h1>Đường dãn không tồn tại</h1>
   }
];

export default function Routers() {
   return useRoutes(routers);
}