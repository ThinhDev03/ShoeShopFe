import { routerPath } from '@App/configs/routerConfig';

export const breadcrumbsUpdateProduct = [
   {
      name: 'Trang chủ',
      link: '/'
   },
   {
      name: 'Sản phẩm',
      link: '/admin/' + routerPath.PRODUCTS
   }
];

export const breadcrumbsCreate = [
   {
      name: 'Trang chủ',
      link: '/'
   },
   {
      name: 'Sản phẩm',
      link: '/admin/' + routerPath.PRODUCTS
   }
];

export const listLabelProductDetail = [
   { label: 'Kích thước', required: true },
   { label: 'Màu sắc', required: true },
   { label: 'Số lượng', required: true },
   { label: 'Giá bán', required: true },
   { label: 'Khuyến mại', required: false },
   { label: 'hình ảnh', required: true }
];
