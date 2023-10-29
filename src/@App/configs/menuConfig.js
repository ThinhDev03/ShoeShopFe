import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

import { routerPath } from './routerConfig';
import CategoryIcon from '@mui/icons-material/Category';
import { ROLE } from './role';
import Brand from '@App/assets/svg/brand';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PersonIcon from '@mui/icons-material/Person';

const menuCofig = [
   {
      id: 1,
      role: ['*'],
      title: 'Trang Chủ',
      aceptPermission: true,
      icon: DashboardOutlinedIcon,
      path: ''
   },
   {
      id: 2,
      role: [ROLE[1], ROLE[2]],
      title: 'Danh mục sản phẩm',
      icon: CategoryIcon,
      path: routerPath.CATEGORYPRODUCTS,
      children: [
         { title: 'Tổng quan', path: routerPath.CATEGORYPRODUCTS },
         { title: 'Tạo mới', path: routerPath.CATEGORYPRODUCTS + '/create' }
      ]
   },
   {
      id: 3,
      role: [ROLE[1], ROLE[2]],
      title: 'Thương hiệu',
      icon: Brand,
      path: routerPath.BRAND,
      children: [
         { title: 'Tổng quan', path: routerPath.BRAND },
         { title: 'Tạo mới', path: routerPath.BRAND + '/create' }
      ]
   },
   {
      id: 6,
      role: [ROLE[1], ROLE[2]],
      title: 'Sản phẩm',
      icon: Inventory2Icon,
      path: routerPath.PRODUCTS,
      children: [
         { title: 'Tổng quan', path: routerPath.PRODUCTS },
         { title: 'Tạo mới', path: routerPath.PRODUCTS + '/create' },
         { title: 'Màu sắc', path: routerPath.PRODUCTS + '/' + routerPath.COLOR },
         { title: 'Kích thước', path: routerPath.PRODUCTS + '/' + routerPath.SIZE }
      ]
   },
   {
      id: 7,
      role: [ROLE[1], ROLE[2]],
      title: 'Người dùng',
      icon: PersonIcon,
      path: routerPath.USER,
      children: [
         { title: 'Tổng quan', path: routerPath.USER },
         { title: 'Tạo nhân viên', path: routerPath.USER + '/create' }
      ]
   }
   // {
   //    id: 4,
   //    role: [ROLE[1], ROLE[2]],
   //    title: 'Màu sản phẩm',
   //    icon: ColorLensIcon,
   //    path: routerPath.COLOR,
   //    children: [
   //       { title: 'Tổng quan', path: routerPath.COLOR },
   //       { title: 'Tạo mới', path: routerPath.COLOR + '/create' },
   //       { title: 'Cập nhật', path: routerPath.COLOR + '/update' }
   //    ]
   // },
   // {
   //    id: 5,
   //    role: [ROLE[1], ROLE[2]],
   //    title: 'Kích thước sản phẩm',
   //    icon: ColorLensIcon,
   //    path: routerPath.SIZE,
   //    children: [
   //       { title: 'Tổng quan', path: routerPath.SIZE },
   //       { title: 'Tạo mới', path: routerPath.SIZE + '/create' },
   //       { title: 'Cập nhật', path: routerPath.SIZE + '/update' }
   //    ]
   // },
];
export default menuCofig;
