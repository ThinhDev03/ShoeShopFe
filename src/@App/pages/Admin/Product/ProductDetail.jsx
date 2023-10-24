import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { routerPath } from '@App/configs/routerConfig';
import yupProductDetail from './utils/yupProductDetail';
import BasicPage from '@App/components/customs/BasicPage';
import productService from '@App/services/product.service';
import productDetail from '@App/services/product-detail.service';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import BaseFormProductDetail from './components/BaseFormProductDetail';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';

function ProductDetail() {
   const { id } = useParams();
   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupProductDetail),
      defaultValues: [yupProductDetail.getDefault()]
   });

   const { data } = useQuery(['getProductItem', id], async () => {
      try {
         await productService.getOne(id);
         return true;
      } catch (error) {
         errorMessage('Sản phẩm không tồn tại');
      }
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
      const { variation } = data;
      const newData = variation.map((item) => ({ ...item, product_id: id }));
      mutate(newData);
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

   return data ? (
      <BasicPage currentPage='Thêm biến thể sản phẩm' breadcrumbs={breadcrumbs}>
         <BaseFormProductDetail form={form} onSubmit={onSubmit} loading={isLoading} />
      </BasicPage>
   ) : (
      <Box
         sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
         }}>
         <Typography variant='h5' sx={{ color: '#ABAEB0' }}>
            Sản phẩm chính không tồn tại.
         </Typography>
         <Box component='p' sx={{ color: '#ABAEB0' }}>
            {' '}
            vui lòng thêm sản phẩm chính trước khi thêm các biến thể
         </Box>
      </Box>
   );
}

export default ProductDetail;
