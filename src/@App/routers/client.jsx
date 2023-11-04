import { routerPath } from '@App/configs/routerConfig';
import Loadable from './components/Loadable';
import { lazy } from 'react';
import PublicRouter from './components/PublicRouter';

const Signin = Loadable(lazy(() => import('@App/pages/Auth/Signin')));
const Register = Loadable(lazy(() => import('@App/pages/Auth/Register')));
const Product = Loadable(lazy(() => import('@App/pages/Views/Product')));
const ProductDetail = Loadable(lazy(() => import('@App/pages/Views/ProductDetail')));
const Bill = Loadable(lazy(() => import('@App/pages/Views/Bill')));
const Shipping = Loadable(lazy(() => import('@App/pages/Views/Shipping')));
const Cart = Loadable(lazy(() => import('@App/pages/Views/Cart')));

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
];

export default clientRoute;
