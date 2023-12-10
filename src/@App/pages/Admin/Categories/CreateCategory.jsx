import BasicPage from '@App/components/customs/BasicPage';
import { routerPath } from '@App/configs/routerConfig';
import React from 'react';
import BaseFormCategory from './components/BaseFormCategory';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import categoryService from '@App/services/category.service';
import { successMessage } from '@Core/Helper/Message';
import yupCategory from './utils/yupCategory';
import { yupResolver } from '@hookform/resolvers/yup';

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

function CreateCategory() {
   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupCategory),
      defaultValues: yupCategory.getDefault()
   });

   const { isLoading, mutate } = useMutation({
      mutationFn: async (data) => {
         return await categoryService.createCategory(data);
      },
      onSuccess: () => {
         form.reset();
         successMessage(' Thêm thương hiệu thành công ');
      }
   });

   const onSubmit = async (data) => {
      mutate(data);
   };

   return (
      <BasicPage currentPage='Thêm danh mục sản phẩm ' breadcrumbs={breadcrumbs}>
         <BaseFormCategory form={form} onSubmit={onSubmit} isLoading={isLoading} />
      </BasicPage>
   );
}

export default CreateCategory;
