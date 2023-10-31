import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import BaseFormClasses from './components/BaseFormSize';
import yupSize from './utils/yupSize';
import { gradeList, headTeacher } from './utils';
import BasicPage from '@App/components/customs/BasicPage';
import classesService from '@App/services/category.service';
import { useSetNotifyState } from '@App/redux/slices/toastMessage.slice';
import { routerPath } from '@App/configs/routerConfig';
import sizeService from '@App/services/size.service';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import { useMutation } from '@tanstack/react-query';

const breadcrumbs = [
   {
      name: 'Trang chủ',
      link: '/'
   },
   {
      name: 'Kích thước',
      link: '/admin/' + routerPath.PRODUCTS + '/' + routerPath.SIZE
   }
];

export default function CreateSize() {
   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupSize),
      defaultValues: yupSize.getDefault()
   });

   const { isLoading, mutate } = useMutation({
      mutationFn: async (data) => {
         return await sizeService.createSize(data);
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
      <BasicPage currentPage='Thêm mới kích thước sản phẩm' breadcrumbs={breadcrumbs}>
         <BaseFormClasses form={form} onSubmit={onSubmit} isLoading={isLoading} />
      </BasicPage>
   );
}
