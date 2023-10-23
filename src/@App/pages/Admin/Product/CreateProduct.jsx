import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import yupProduct from './utils/yupProduct';
import { routerPath } from '@App/configs/routerConfig';
import BasicPage from '@App/components/customs/BasicPage';
import BaseFormProduct from './components/BaseFormProduct';
import productService from '@App/services/product.service';
import { errorMessage, successMessage } from '@Core/Helper/Message';

const breadcrumbs = [
   {
      name: 'Trang chủ',
      link: '/'
   },
   {
      name: 'Sản phẩm',
      link: '/admin/' + routerPath.PRODUCTS
   }
];

function CreateProduct() {
   const navigate = useNavigate();

   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupProduct),
      defaultValues: yupClasses.getDefault()
   });

   const { isLoading, mutate } = useMutation({
      mutationFn: async (data) => {
         return await productService.createProduct(data);
      },
      onSuccess: (data) => {
         form.reset();
         successMessage(data.message);
         navigate(data.data._id);
      },
      onError: (error) => {
         errorMessage(error);
      }
   });

   const onSubmit = async (data) => {
      mutate(data);
   };
   return (
      <BasicPage currentPage='Thêm sản phẩm' breadcrumbs={breadcrumbs}>
         <BaseFormProduct form={form} onSubmit={onSubmit} loading={isLoading} />
      </BasicPage>
   );
}

export default CreateProduct;
