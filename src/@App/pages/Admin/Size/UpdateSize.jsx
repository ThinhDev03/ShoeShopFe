import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';

import yupSize from './utils/yupSize';
import sizeService from '@App/services/size.service';
import BasicPage from '@App/components/customs/BasicPage';
import { routerPath } from '@App/configs/routerConfig';
import { successMessage } from '@Core/Helper/Message';
import BaseFormSize from './components/BaseFormSize';

const breadcrumbs = [
   {
      name: 'Trang chủ',
      link: '/'
   },
   {
      name: 'Size',
      link: '/admin/' + routerPath.PRODUCTS + '/' + routerPath.SIZE
   }
];

export default function UpdateSize() {
   let { id } = useParams();

   const { data: dataSize, refetch: findOneColor } = useQuery(
      ['getSize', { id }],
      async () => {
         const rest = await sizeService.getOne(id);
         return rest.data;
      },
      {
         onSuccess: (data) => {
            form.reset(data);
         }
      }
   );

   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupSize)
   });

   const { mutate, isLoading } = useMutation({
      mutationFn: async (data) => {
         return await sizeService.updateOne(data, id);
      },
      onSuccess: () => {
         findOneColor();
         successMessage('Cập nhật Size thành công');
      }
   });

   const onSubmit = async (data) => {
      mutate(data);
   };

   return (
      <BasicPage currentPage='Cập nhật' breadcrumbs={breadcrumbs}>
         <BaseFormSize form={form} onSubmit={onSubmit} isLoading={isLoading} title='Cập nhật' />
      </BasicPage>
   );
}
