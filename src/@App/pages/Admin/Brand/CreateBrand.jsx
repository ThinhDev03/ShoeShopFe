import BasicPage from '@App/components/customs/BasicPage';
import { routerPath } from '@App/configs/routerConfig';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
<<<<<<< HEAD
import yupClasses from './utils/yupClasses';
=======
import yupBrand from './utils/yupBrand';
>>>>>>> 6c1eb1d60cc13036287f8f7bd7ace79c0b601509
import BaseFormBrand from './components/BaseFormBrand';
import brandService from '@App/services/brand.service';
import { useMutation } from '@tanstack/react-query';
import { errorMessage, successMessage } from '@Core/Helper/Message';

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

function CreateBrand() {
   const form = useForm({
      mode: 'onChange',
<<<<<<< HEAD
      resolver: yupResolver(yupClasses),
      defaultValues: yupClasses.getDefault()
=======
      resolver: yupResolver(yupBrand),
      defaultValues: yupBrand.getDefault()
>>>>>>> 6c1eb1d60cc13036287f8f7bd7ace79c0b601509
   });

   const { isLoading, mutate } = useMutation({
      mutationFn: async (data) => {
         console.log(data);
         return await brandService.createBrand(data);
      },
      onSuccess: () => {
         form.reset();
         successMessage('Thêm thương hiệu thành công');
      },
      onError: (error) => {
         errorMessage(error);
      }
   });

   const onSubmit = async (data) => {
      mutate(data);
   };

   return (
      <BasicPage currentPage='Thêm thương hiệu' breadcrumbs={breadcrumbs}>
         <BaseFormBrand form={form} onSubmit={onSubmit} isLoading={isLoading} />
      </BasicPage>
   );
}

export default CreateBrand;
