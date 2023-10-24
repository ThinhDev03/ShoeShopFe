import BasicPage from '@App/components/customs/BasicPage';
import React, { useEffect } from 'react';
import BaseFormProduct from './components/BaseFormProduct';
import productService from '@App/services/product.service';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import yupProduct from './utils/yupProduct';
import { yupResolver } from '@hookform/resolvers/yup';
import { routerPath } from '@App/configs/routerConfig';

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

function UpdateProduct() {
   let { id } = useParams();

   const { data: dataProduct, refetch: findOneColor } = useQuery(['getProduct', { id }], async () => {
      const rest = await productService.getOne(id);
      return rest.data;
   });

   const form = useForm({
      resolver: yupResolver(yupProduct)
   });

   useEffect(() => {
      dataProduct &&
         form.reset({
            name: dataProduct?.name,
            brand_id: dataProduct.brand_id._id,
            category_id: dataProduct.category_id._id,
            thumbnail: dataProduct.thumbnail,
            description: dataProduct.description
         });
      console.log(dataProduct);
   }, [dataProduct]);

   const { mutate, isLoading } = useMutation({
      mutationFn: async (data) => {
         return await productService.updateOne(data, id);
      },
      onSuccess: () => {
         findOneColor();
         successMessage('Cập nhật Size thành công');
      }
   });

   const onSubmit = async (data) => {
      if (form.formState.touchedFields || form.formState.isDirty) {
         mutate(data);
      }
   };

   return (
      <BasicPage currentPage='Sửa sản phẩm' breadcrumbs={breadcrumbs}>
         <BaseFormProduct form={form} onSubmit={onSubmit} loading={isLoading} />
      </BasicPage>
   );
}

export default UpdateProduct;
