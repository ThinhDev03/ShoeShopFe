import React, { useState } from 'react';
import { breadcrumbsCreate } from './utils';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yupProduct from './utils/yupProduct';
import BasicPage from '@App/components/customs/BasicPage';
import { styled } from '@mui/material';
import BaseFormProduct from './components/BaseFormProduct';
import BaseFormProductDetail from './components/BaseFormProductDetail';

function SaveProduct() {
   let [searchParams, setSearchParams] = useSearchParams();
   const [isChangeImages, setIsChangeImages] = useState(false);
   const product_id = searchParams.get('id');

   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupProduct),
      defaultValues: yupProduct.getDefault()
   });

   return (
      <BasicPage currentPage='Thêm sản phẩm' breadcrumbs={breadcrumbsCreate}>
         <BaseFormProduct
            setIsChangeImages={setIsChangeImages}
            form={form}
            product_id={product_id}
            setSearchParams={setSearchParams}
         />
         {product_id && (
            <React.Fragment>
               <Divider />
               <BaseFormProductDetail isChangeImages={isChangeImages} product_id={product_id} />
            </React.Fragment>
         )}
      </BasicPage>
   );
}
const Divider = styled('div')(({ theme }) => ({
   margin: '32px 0px 15px 0',
   backgroundColor: theme.palette.education.text.white,
   background: 'url(https://ananas.vn/wp-content/themes/ananas/fe-assets/images/bg_divider.png) repeat-x 7px',
   height: '2px'
}));

export default SaveProduct;
