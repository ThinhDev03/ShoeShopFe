import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

import { routerPath } from './routerConfig';
import CategoryIcon from '@mui/icons-material/Category';
import { ROLE } from './role';
import Brand from '@App/assets/svg/brand';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DiscountIcon from '@mui/icons-material/Discount';
const menuCofig = [
   {
      id: 1,
      role: [ROLE[1]],
      title: 'Trang Chủ',
      aceptPermission: true,
      icon: DashboardOutlinedIcon,
      path: ''
   },
   {
      id: 1,
      role: [ROLE[2]],
      title: 'Trang Chủ',
      aceptPermission: true,
      icon: DashboardOutlinedIcon,
      path: '/admin/home'
   },
   {
      id: 2,
      role: [ROLE[1], ROLE[2]],
      title: 'Danh mục sản phẩm',
      icon: CategoryIcon,
      path: routerPath.CATEGORYPRODUCTS,
      children: [
         { title: 'Danh mục', path: routerPath.CATEGORYPRODUCTS },
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
         { title: 'Thương hiệu', path: routerPath.BRAND },
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
         { title: 'Sản phẩm', path: routerPath.PRODUCTS },
         { title: 'Tạo mới', path: routerPath.PRODUCTS + '/save' },
         { title: 'Màu sắc', path: routerPath.PRODUCTS + '/' + routerPath.COLOR },
         { title: 'Kích thước', path: routerPath.PRODUCTS + '/' + routerPath.SIZE }
      ]
   },
   {
      id: 7,
      role: [ROLE[1]],
      title: 'Người dùng',
      icon: PersonIcon,
      path: routerPath.USER,
      children: [
         { title: 'Người dùng', path: routerPath.USER },
         { title: 'Tạo nhân viên', path: routerPath.USER + '/create' }
      ]
   },
   {
      id: 8,
      role: [ROLE[1], ROLE[2]],
      title: 'Đơn hàng',
      icon: ReceiptLongIcon,
      path: routerPath.BILL,
      children: [{ title: 'Đơn hàng', path: routerPath.BILL }]
   },
   {
      id: 9,
      role: [ROLE[1]],
      title: 'Voucher giảm giá',
      icon: DiscountIcon,
      path: routerPath.VOUCHER,
      children: [
         { title: 'Voucher', path: routerPath.VOUCHER },
         { title: 'Tạo voucher', path: routerPath.VOUCHER + '/create' }
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
