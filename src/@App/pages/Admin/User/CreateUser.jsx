import React from 'react';
import { useForm } from 'react-hook-form';
import BaseFormUser from './components/BaseFormUser';
import { yupResolver } from '@hookform/resolvers/yup';
import yupUser from './utils/yupUser';
import { gender } from './utils';
import BasicPage from '@App/components/customs/BasicPage';
import authService from '@App/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { ROLE } from '@App/configs/role';
import { errorMessage, successMessage } from '@Core/Helper/Message';

export default function CreateUser() {
   const navigate = useNavigate();
   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupUser),
      defaultValues: yupUser.getDefault()
   });

   const onSubmit = async (data) => {
      try {
         const body = {
            role: ROLE[3],
            ...data
         };
         await authService.createEmployee(body);
         successMessage('Đăng ký thành công nhân viên!');
         navigate('/admin/user');
      } catch (error) {
         errorMessage(error);
      }
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
