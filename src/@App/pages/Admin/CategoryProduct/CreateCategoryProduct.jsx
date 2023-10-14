import BasicPage from '@App/components/customs/BasicPage';
import { routerPath } from '@App/configs/routerConfig';
import React from 'react';
import { useForm } from 'react-hook-form';
import BaseFormCategoryProduct from './components/BaseFormCategoryProduct';
import { yupResolver } from '@hookform/resolvers/yup';
import yupClasses from './utils/yupClasses';

const breadcrumbs = [
   {
      name: 'Trang chủ',
      link: '/'
   },
   {
      name: 'Danh mục sản phẩm',
      link: '/admin/' + routerPath.CATEGORYPRODUCTS
   }
];

function CreateCategoryProduct() {
   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupClasses),
      defaultValues: yupClasses.getDefault()
   });

   return (
      <BasicPage currentPage='Thêm danh mục sản phẩm' breadcrumbs={breadcrumbs}>
         <BaseFormCategoryProduct form={form} />
      </BasicPage>
   );
}

export default CreateCategoryProduct;
