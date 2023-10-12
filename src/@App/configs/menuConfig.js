import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

import { routerPath } from './routerConfig';
import BrandingWatermarkOutlinedIcon from '@mui/icons-material/BrandingWatermarkOutlined';
import { ROLE } from './role';

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
      id: 3,
      role: [ROLE[1], ROLE[2]],
      title: 'Lớp Học',
      icon: BrandingWatermarkOutlinedIcon,
      path: routerPath.CLASSES,
      children: [
         { title: 'Tổng quan', path: routerPath.CLASSES },
         { title: 'Tạo mới', path: routerPath.CLASSES + '/create' },
         { title: 'Cập nhật', path: routerPath.CLASSES + '/update' }
      ]
   }
];
export default menuCofig;
