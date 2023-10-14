import BasicPage from '@App/components/customs/BasicPage';
import { routerPath } from '@App/configs/routerConfig';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yupClasses from './utils/yupClasses';
import BaseFormBrand from './components/BaseFormBrand';

const breadcrumbs = [
   {
      name: 'Trang chủ',
      link: '/'
   },
   {
      name: 'Thương hiệu',
      link: '/admin/' + routerPath.BRAND
   }
];

function CreateBrand() {
   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupClasses),
      defaultValues: yupClasses.getDefault()
   });

   return (
      <BasicPage currentPage='Thêm thương hiệu' breadcrumbs={breadcrumbs}>
         <BaseFormBrand form={form} />
      </BasicPage>
   );
}

export default CreateBrand;
