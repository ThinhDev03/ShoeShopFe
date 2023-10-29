import React from 'react';
import { useForm } from 'react-hook-form';
import BaseFormUser from './components/BaseFormUser';
import { yupResolver } from '@hookform/resolvers/yup';
import yupUser from './utils/yupUser';
import { gender } from './utils';
import BasicPage from '@App/components/customs/BasicPage';
import userService from '@App/services/user.service';

export default function CreateUser() {
   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupUser),
      defaultValues: yupUser.getDefault()
   });

   const onSubmit = async (data) => {
      try {
         await userService.createTeacher(data);
      } catch (error) {}
   };
   const props = {
      gender,
      form,
      onSubmit
   };
   const breadcrumbs = [
      {
         name: 'Trang chủ',
         link: '/'
      },
      {
         name: 'Người dùng',
         link: '/user'
      }
   ];
   return (
      <BasicPage currentPage='Thêm người dùng' breadcrumbs={breadcrumbs}>
         <BaseFormUser {...props} />
      </BasicPage>
   );
}
