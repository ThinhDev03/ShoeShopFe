// import { lazy } from "react";
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import MainLayout from '@App/components/layouts/mainLayout';
import Loadable from './components/Loadable';
import classesRouter from './classes.router';
import PublicRouter from './components/PublicRouter';
import PrivateRouter from './components/PrivateRouter';
import productRouter from './product.router';

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
         <MainLayout />
         // </PrivateRouter>
      ),
      children: [
         {
            index: true,
            element: <Home />
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
