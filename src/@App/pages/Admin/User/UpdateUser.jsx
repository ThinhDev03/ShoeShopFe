import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import BaseFormUser from './components/BaseFormUser';
import yupUser from './utils/yupUser';
import { gender } from './utils';
import BasicPage from '@App/components/customs/BasicPage';
import userService from '@App/services/user.service';
import { useSetNotifyState } from '@App/redux/slices/toastMessage.slice';

export default function UpdateUser() {
   const { setToastInformation } = useSetNotifyState();
   const { id } = useParams();

   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupUser),
      defaultValues: yupUser.getDefault() //userService.getTeacher({ _id: id })
   });

   const onSubmit = async (data) => {

      try {
         await userService.updateUser(data, id, 'patch');
         setToastInformation({ message: 'Thêm người dùng thành công' });
      } catch (error) {
         console.error(error?.message);
         setToastInformation({
            message: data?.message || 'Thêm người dùng không thành công',
            status: 'error'
         });
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
