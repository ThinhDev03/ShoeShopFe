import React from 'react';
import { useForm } from 'react-hook-form';

import BasicPage from '@App/components/customs/BasicPage';
import BaseFormProductDetail from './components/BaseFormProductDetail';
import { yupResolver } from '@hookform/resolvers/yup';
import yupProductDetail from './utils/yupProductDetail';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import productDetail from '@App/services/product-detail.service';
import { routerPath } from '@App/configs/routerConfig';

function ProductDetail() {
   const { id } = useParams();
   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupProductDetail),
      defaultValues: yupProductDetail.getDefault()
   });

   const { isLoading, mutate } = useMutation({
      mutationFn: async (data) => {
         return await productDetail.createProductDetail(data);
      },
      onSuccess: (data) => {
         console.log(data);
         form.reset();
         successMessage(data.message);
      },
      onError: (error) => {
         errorMessage(error);
      }
   });

   const onSubmit = (data) => {
      const dataProduct = { ...data, product_id: id };
      mutate(dataProduct);
   };

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

   return (
      <BasicPage currentPage='Thêm detail sản phẩm' breadcrumbs={breadcrumbs}>
         <BaseFormProductDetail form={form} onSubmit={onSubmit} loading={isLoading} />
      </BasicPage>
   );
}

export default ProductDetail;
