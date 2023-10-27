import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
<<<<<<< HEAD
import yupClasses from './utils/yupClasses';
=======
>>>>>>> 6c1eb1d60cc13036287f8f7bd7ace79c0b601509
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';

import BaseFormBrand from './components/BaseFormBrand';
import brandService from '@App/services/brand.service';
import { routerPath } from '@App/configs/routerConfig';
import BasicPage from '@App/components/customs/BasicPage';
import { successMessage } from '@Core/Helper/Message';
<<<<<<< HEAD
=======
import yupBrand from './utils/yupBrand';
>>>>>>> 6c1eb1d60cc13036287f8f7bd7ace79c0b601509

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

   const { data: dataBrand, refetch: findOneBrand } = useQuery(['findOneBrand'], async () => {
      const rest = await brandService.getOne(id);
      return rest.data;
   });

   const form = useForm({
      mode: 'onChange',
<<<<<<< HEAD
      resolver: yupResolver(yupClasses)
=======
      resolver: yupResolver(yupBrand)
>>>>>>> 6c1eb1d60cc13036287f8f7bd7ace79c0b601509
   });

   useEffect(() => {
      form.reset(dataBrand);
   }, [dataBrand]);

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
      <BasicPage currentPage='Thêm danh mục sản phẩm' breadcrumbs={breadcrumbs}>
<<<<<<< HEAD
         <BaseFormBrand form={form} onSubmit={onSubmit} isLoading={isLoading} title="Cập nhật" />
=======
         <BaseFormBrand form={form} onSubmit={onSubmit} isLoading={isLoading} title='Cập nhật' />
>>>>>>> 6c1eb1d60cc13036287f8f7bd7ace79c0b601509
      </BasicPage>
   );
}

export default UpdateBrand;
