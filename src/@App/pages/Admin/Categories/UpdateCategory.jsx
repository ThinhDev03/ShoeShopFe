import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import BaseFormCategory from './components/BaseFormCategory';
import BasicPage from '@App/components/customs/BasicPage';
import { yupResolver } from '@hookform/resolvers/yup';
import yupCategory from './utils/yupCategory';
import { routerPath } from '@App/configs/routerConfig';
import { useMutation, useQuery } from '@tanstack/react-query';
import { successMessage } from '@Core/Helper/Message';
import categoryService from '@App/services/category.service';
import { useParams } from 'react-router-dom';

const breadcrumbs = [
   {
      name: 'Trang chủ ',
      link: '/'
   },
   {
      name: 'Danh mục sản phẩm',
      link: '/admin/' + routerPath.CATEGORYPRODUCTS
   }
];

function UpdateCategory() {
   let { id } = useParams();

   const { data: dataCategory, refetch: findOneCategory } = useQuery(['getCategory', { id }], async () => {
      const rest = await categoryService.getOne(id);
      return rest.data;
   },{
      onSuccess: (data) => {
         form.reset(data);
      }
   });

   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupCategory)
   });

   const { mutate, isLoading } = useMutation({
      mutationFn: async (data) => {
         return await categoryService.updateOne(data, id);
      },
      onSuccess: () => {
         findOneCategory();
         successMessage(' Cập nhật danh mục thành công ');
      }
   });

   const onSubmit = async (data) => {
      mutate(data);
   };

   return (
      <BasicPage currentPage='Cập nhật danh mục sản phẩm' breadcrumbs={breadcrumbs}>
         <BaseFormCategory form={form} onSubmit={onSubmit} isLoading={isLoading} title='Cập nhật' />
      </BasicPage>
   );
}

export default UpdateCategory;
