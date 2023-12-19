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
export const accountTypes = [
   { label: 'Đã khóa', value: true },
   { label: 'Đang hoạt động', value: false }
];

export const ListTitle = [
   {
      title: 'Kích thước',
      grid: 2,
      required: true
   },
   {
      title: 'Màu sắc',
      grid: 2,
      required: true
   },
   {
      title: 'Số lượng',
      grid: 2,
      required: true
   },
   {
      title: 'Giá bán',
      grid: 2,
      required: true
   },
   {
      title: 'Sale (%)',
      grid: 2,
      required: false
   },
   {
      title: 'Hình ảnh',
      grid: 2,
      required: true
   }
];
