// import { lazy } from "react";
import { lazy } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import Loadable from './components/Loadable';

import AdminLayout from '@App/components/layouts/admin';
import CommonLayout from '@App/components/layouts/common';

import PublicRouter from './components/PublicRouter';
import PrivateRouter from './components/PrivateRouter';
import Home from '@App/pages/Admin/Home';
import { routerPath } from '@App/configs/routerConfig';

import categoryProductRouter from './admin/categoryProduct.router';
import brandRouter from './admin/brand.router';
import productRouter from './admin/product.router';

const Signin = Loadable(lazy(() => import('@App/pages/Auth/Signin')));
const Register = Loadable(lazy(() => import('@App/pages/Auth/Register')));
const Product = Loadable(lazy(() => import('@App/pages/Views/Product')));
const ProductDetail = Loadable(lazy(() => import('@App/pages/Views/ProductDetail')));
// const GetCurrentUser = lazy(() => import('@App/pages/Signin/GetCurrentUser'));

const routers = [
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
         },
         {
            path: routerPath.PRODUCTS,
            element: <Product />
         },
         {
            path: routerPath.PRODUCTDETAIL,
            element: <ProductDetail />
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
         // <PrivateRouter>
         <AdminLayout />
         // </PrivateRouter>
      ),
      children: [
         {
            index: true,
            element: <Outlet />
         },
         categoryProductRouter,
         brandRouter,
         productRouter
      ]
   }
];

export default function Routers() {
   console.log('router run');
   return useRoutes(routers);
}
