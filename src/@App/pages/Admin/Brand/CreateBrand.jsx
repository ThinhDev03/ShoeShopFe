import BasicPage from '@App/components/customs/BasicPage';
import { routerPath } from '@App/configs/routerConfig';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yupBrand from './utils/yupBrand';
import BaseFormBrand from './components/BaseFormBrand';
import brandService from '@App/services/brand.service';
import { useMutation } from '@tanstack/react-query';
import { errorMessage, successMessage } from '@Core/Helper/Message';

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
      resolver: yupResolver(yupBrand),
      defaultValues: yupBrand.getDefault()
   });

   const { isLoading, mutate } = useMutation({
      mutationFn: async (data) => {
         return await brandService.createBrand(data);
      },
      onSuccess: () => {
         form.reset();
         successMessage('Thêm thương hiệu thành công');
      },
      onError: (error) => {
         errorMessage(error);
      }
   });

   const onSubmit = async (data) => {
      mutate(data);
   };

   return (
      <BasicPage currentPage='Thêm thương hiệu' breadcrumbs={breadcrumbs}>
         <BaseFormBrand form={form} onSubmit={onSubmit} isLoading={isLoading} />
      </BasicPage>
   );
}

export default CreateBrand;
