// import { lazy } from "react";
import { lazy } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import Loadable from './components/Loadable';

import AdminLayout from '@App/components/layouts/admin';
import CommonLayout from '@App/components/layouts/common';

import PublicRouter from './components/PublicRouter';
import PrivateRouter from './components/PrivateRouter';
import { routerPath } from '@App/configs/routerConfig';

import brandRouter from './admin/brand.router';
import productRouter from './admin/product.router';
import Home from '@App/pages/Views/Home';
import Cart from '@App/pages/Views/Cart';
import Shipping from '@App/pages/Views/Shipping';
import categoryRouter from './admin/category.router';
import userRouter from './user.router';
import billRouter from './admin/bill.router';

const Signin = Loadable(lazy(() => import('@App/pages/Auth/Signin')));
const Register = Loadable(lazy(() => import('@App/pages/Auth/Register')));
const Product = Loadable(lazy(() => import('@App/pages/Views/Product')));
const ProductDetail = Loadable(lazy(() => import('@App/pages/Views/ProductDetail')));
// const GetCurrentUser = lazy(() => import('@App/pages/Signin/GetCurrentUser'));

const routers = [
   {
      path: '/',
      element: <CommonLayout />,
      children: [
         {
            index: true,
            element: <Home />
         },
         {
            path: routerPath.PRODUCTS,
            element: <Product />
         },
         {
            path: routerPath.PRODUCTS + '/:id',
            element: <ProductDetail />
         },
         {
            path: routerPath.CART,
            element: <Cart />
         },
         {
            path: routerPath.SHIPPING,
            element: <Shipping />
         },
         {
            path: '/',
            element: <PublicRouter />,
            children: [
               {
                  path: 'signin',
                  element: <Signin />
               },
               {
                  path: 'register',
                  element: <Register />
               }
            ]
         }
         // {
         //    path: 'success',
         //    element: <GetCurrentUser />
         // }
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
      element: <h1>Đường đãn không tồn tại</h1>
   }
];

export default function Routers() {
   return useRoutes(routers);
}
