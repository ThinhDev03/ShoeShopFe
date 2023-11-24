import { routerPath } from '@App/configs/routerConfig';
import Loadable from './components/Loadable';
import { lazy } from 'react';
import PublicRouter from './components/PublicRouter';
import CheckLoginUser from './components/CheckLoginUser';
import ChangePassword from '@App/pages/Views/ChangePassword';

const Profile = Loadable(lazy(() => import('@App/pages/Views/Profile')));
const Signin = Loadable(lazy(() => import('@App/pages/Auth/Signin')));
const Register = Loadable(lazy(() => import('@App/pages/Auth/Register')));
const Product = Loadable(lazy(() => import('@App/pages/Views/Product')));
const ProductDetail = Loadable(lazy(() => import('@App/pages/Views/ProductDetail')));
const Bill = Loadable(lazy(() => import('@App/pages/Views/Bill')));
const Shipping = Loadable(lazy(() => import('@App/pages/Views/Shipping')));
const Cart = Loadable(lazy(() => import('@App/pages/Views/Cart')));
const LatestProduct = Loadable(lazy(() => import('@App/pages/Views/LatestProduct')));
const Sale = Loadable(lazy(() => import('@App/pages/Views/Sale')));

const clientRoute = [
   {
      path: routerPath.PRODUCTS,
      element: <Product />
   },
   {
      path: routerPath.PRODUCTS + '/:id',
      element: <ProductDetail />
   },
   {
      path: '/sale',
      element: <Sale />
   },
   {
      path: '/latest',
      element: <LatestProduct />
   },

   {
      path: '',
      element: <CheckLoginUser />,
      children: [
         {
            path: routerPath.CART,
            element: <Cart />
         },
         {
            path: routerPath.SHIPPING,
            element: <Shipping />
         },
         {
            path: routerPath.BILL,
            element: <Bill />
         },
         {
            path: routerPath.PROFILE,
            element: <Profile />
         },
         {
            path: routerPath.CHANGE_PASSWORD,
            element: <ChangePassword />
         }
      ]
   },
   {
      path: '/',
      element: <PublicRouter />,
      children: [
         {
            path: 'sign-in',
            element: <Signin />
         },
         {
            path: 'register',
            element: <Register />
         }
      ]
   }
];

export default clientRoute;
