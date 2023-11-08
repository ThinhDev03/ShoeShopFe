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
<<<<<<< HEAD

const Signin = Loadable(lazy(() => import('@App/pages/Auth/Signin')));
const Register = Loadable(lazy(() => import('@App/pages/Auth/Register')));
const Product = Loadable(lazy(() => import('@App/pages/Views/Product')));
const ProductDetail = Loadable(lazy(() => import('@App/pages/Views/ProductDetail')));
const GetCurrentUser = lazy(() => import('@App/pages/Signin/GetCurrentUser'));
=======
import clientRoute from './client';
import Home from '@App/pages/Views/Home';
>>>>>>> test

const routers = [
   {
      path: '/',
      element: <CommonLayout />,
      children: [
         {
            index: true,
            element: <Home />
         },
<<<<<<< HEAD
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
         },
         {
            path: 'success',
            element: <GetCurrentUser />
         }
=======
         ...clientRoute
>>>>>>> test
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
