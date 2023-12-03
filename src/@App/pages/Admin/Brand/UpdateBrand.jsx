import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';

import BaseFormBrand from './components/BaseFormBrand';
import brandService from '@App/services/brand.service';
import { routerPath } from '@App/configs/routerConfig';
import BasicPage from '@App/components/customs/BasicPage';
import { successMessage } from '@Core/Helper/Message';
import yupBrand from './utils/yupBrand';

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

function UpdateBrand() {
   let { id } = useParams();

   const { data: dataBrand, refetch: findOneBrand } = useQuery(
      ['findOneBrand'],
      async () => {
         const rest = await brandService.getOne(id);
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
      resolver: yupResolver(yupBrand)
   });

   const { isLoading, mutate } = useMutation({
      mutationFn: async (data) => {
         return await brandService.updateOne(data, id);
      },
      onSuccess: () => {
         findOneBrand();
         successMessage('Thêm thương hiệu thành công');
      }
   });

   const onSubmit = async (data) => {
      mutate(data);
   };

   return (
      <BasicPage currentPage='Thêm thương hiệu sản phẩm' breadcrumbs={breadcrumbs}>
         <BaseFormBrand form={form} onSubmit={onSubmit} isLoading={isLoading} title='Cập nhật' />
      </BasicPage>
   );
}

export default UpdateBrand;
