import BasicPage from '@App/components/customs/BasicPage';
import React from 'react';
import BaseFormVoucher from './components/BaseFormVoucher';
import { useForm } from 'react-hook-form';
import yupVoucher from './utils/yupVoucher';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import voucherService from '@App/services/voucher.service';
import { useNavigate } from 'react-router-dom';

function CreateVoucher() {
   const navigate = useNavigate();
   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupVoucher),
      defaultValues: yupVoucher.getDefault()
   });

   const { isLoading, mutate } = useMutation({
      mutationFn: async (data) => {
         return await voucherService.create(data);
      },
      onSuccess: () => {
         form.reset();
         successMessage('Thêm voucher thành công');
         navigate('/admin/voucher');
      },
      onError: (error) => {
         errorMessage(error);
      }
   }); 
   
   const onSubmit = async (data) => {
      console.log(data);
      mutate(data);
   };

   const breadcrumbs = [
      {
         name: 'Trang chủ',
         link: '/'
      },
      {
         name: 'Voucher',
         link: '/voucher'
      }
   ];
   
   const props = { onSubmit, form };
   return (
      <BasicPage currentPage='Thêm voucher' breadcrumbs={breadcrumbs}>
         <BaseFormVoucher {...props} />
      </BasicPage>
   );
}

export default CreateVoucher;
