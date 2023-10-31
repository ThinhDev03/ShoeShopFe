import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import BaseFormClasses from './components/BaseFormColor';
import yupColor from './utils/yupColor';
import BasicPage from '@App/components/customs/BasicPage';
import colorService from '@App/services/color.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { successMessage } from '@Core/Helper/Message';
import { useParams } from 'react-router-dom';
import { routerPath } from '@App/configs/routerConfig';

const breadcrumbs = [
   {
      name: 'Trang chủ',
      link: '/'
   },
   {
      name: 'Màu sắc',
      link: '/admin/' + routerPath.PRODUCTS + '/' + routerPath.COLOR
   }
];

export default function UpdateColor() {
   let { id } = useParams();

   const { data: dataColor, refetch: findOneColor } = useQuery(
      ['getCategory', { id }],
      async () => {
         const rest = await colorService.getOne(id);
         return rest.data;
      },
      {
         onSuccess: (data) => {
            console.log(data);
            form.reset(data);
         }
      }
   );

   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupColor)
   });

   const { mutate, isLoading } = useMutation({
      mutationFn: async (data) => {
         return await colorService.updateOne(data, id);
      },
      onSuccess: () => {
         findOneColor();
         successMessage('Cập nhật danh mục thành công');
      }
   });

   const onSubmit = async (data) => {
      mutate(data);
   };

   return (
      <BasicPage currentPage='Cập nhật' breadcrumbs={breadcrumbs}>
         <BaseFormClasses form={form} onSubmit={onSubmit} isLoading={isLoading} title='Cập nhật' />
      </BasicPage>
   );
}
