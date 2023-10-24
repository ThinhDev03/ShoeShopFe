import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import BasicPage from '@App/components/customs/BasicPage';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import { useMutation } from '@tanstack/react-query';
import colorService from '@App/services/color.service';
import BaseFormColor from './components/BaseFormColor';
import { routerPath } from '@App/configs/routerConfig';
import yupColor from './utils/yupColor';

const breadcrumbs = [
   {
      name: 'Trang chủ',
      link: '/'
   },
   {
      name: 'Color',
      link: '/admin/' + routerPath.PRODUCTS + '/' + routerPath.COLOR
   }
];

export default function CreateColor() {
   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupColor),
      defaultValues: yupColor.getDefault()
   });

   const { isLoading, mutate } = useMutation({
      mutationFn: async (data) => {
         return await colorService.createColor(data);
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
      <BasicPage currentPage='Thêm mới' breadcrumbs={breadcrumbs}>
         <BaseFormColor form={form} onSubmit={onSubmit} isLoading={isLoading} />
      </BasicPage>
   );
}
