import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import BaseFormUser from './components/BaseFormUser';
import yupUser from './utils/yupUser';
import { gender } from './utils';
import BasicPage from '@App/components/customs/BasicPage';
import userService from '@App/services/user.service';
import authService from '@App/services/auth.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { errorMessage, successMessage } from '@Core/Helper/Message';

export default function UpdateUser() {
   const { id } = useParams();
   const navigate = useNavigate();
   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupUser),
      defaultValues: yupUser.getDefault()
   });

   useQuery(
      ['getListUser', id],
      async () => {
         const rest = await authService.getUserById(id);
         return rest.data;
      },
      {
         onSuccess(user) {
            const { password: _, ...data } = user;
            form.reset(data);
         }
      }
   );

   const onSubmit = async (data) => {
      try {
         await authService.update(data, id);
         successMessage('Sửa thông tin thành công');
         navigate('/admin/user');
      } catch (error) {
         errorMessage('Sửa thông tin thất bại');
         console.error(error?.message);
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
      <BasicPage currentPage='Cập nhật' breadcrumbs={breadcrumbs}>
         <BaseFormUser {...props} />
      </BasicPage>
   );
}
