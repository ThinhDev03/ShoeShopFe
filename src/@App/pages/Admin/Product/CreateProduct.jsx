import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import yupProduct from './utils/yupProduct';
import { routerPath } from '@App/configs/routerConfig';
import BasicPage from '@App/components/customs/BasicPage';
import BaseFormProduct from './components/BaseFormProduct';
import productService from '@App/services/product.service';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import ProductDetail from './ProductDetail';
import { Box, styled } from '@mui/material';

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
   let [searchParams] = useSearchParams();

   const navigate = useNavigate();

   const id = searchParams.get('id');

   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupProduct),
      defaultValues: yupProduct.getDefault()
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

         {id && (
            <React.Fragment>
               <Divider />
               <ProductDetail id={id} />
            </React.Fragment>
         )}
      </BasicPage>
   );
}
const Divider = styled(Box)(({ theme }) => ({
   margin: '32px 0px 15px 0',
   backgroundColor: theme.palette.education.text.white,
   background: 'url(https://ananas.vn/wp-content/themes/ananas/fe-assets/images/bg_divider.png) repeat-x 7px',
   height: '2px'
}));
export default CreateProduct;
