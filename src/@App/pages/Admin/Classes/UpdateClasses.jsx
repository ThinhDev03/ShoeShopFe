import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import BaseFormClasses from './components/BaseFormClasses';
import yupClasses from './utils/yupClasses';
import { gradeList } from './utils';
import BasicPage from '@App/components/customs/BasicPage';

export default function UpdateClasses() {
   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupClasses),
      defaultValues: yupClasses.getDefault()
   });

   const onSubmit = async (data) => {
      try {
         console.log(data);
      } catch (error) {
         console.log('-------', error);
      }
   };
   const props = {
      gradeList,
      form,
      onSubmit
   };
   const breadcrumbs = [
      {
         name: 'Trang chủ',
         link: '/'
      },
      {
         name: 'Lớp học',
         link: '/classes'
      }
   ];
   return (
      <BasicPage currentPage='Cập nhật' breadcrumbs={breadcrumbs}>
         <BaseFormClasses {...props} />
      </BasicPage>
   );
}
