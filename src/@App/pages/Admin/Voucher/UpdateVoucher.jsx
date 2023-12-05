import BasicPage from '@App/components/customs/BasicPage';
import React from 'react';
import BaseFormVoucher from './components/BaseFormVoucher';
import { useForm } from 'react-hook-form';
import yupVoucher from './utils/yupVoucher';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import voucherService from '@App/services/voucher.service';
import { useNavigate, useParams } from 'react-router-dom';



function UpdateVoucher() {
   const { id } = useParams();
   const navigate = useNavigate();
   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupVoucher),
      defaultValues: yupVoucher.getDefault()
   });

   useQuery(
      ['getVoucherDetail', { id }],
      async () => {
         const res = await voucherService.find(id);
         return res.data;
      },
      {
         onSuccess: (data) => {
            form.reset(data);
         }
      }
   );

   const { isLoading, mutate } = useMutation({
      mutationFn: async ({ _id, ...data }) => {
         return await voucherService.update(data, _id);
      },
      onSuccess: () => {
         form.reset();
         successMessage('Cập nhật voucher thành công.');
         navigate('/admin/voucher');
      },
      onError: (error) => {
         errorMessage(error);
      }
   });

   const onSubmit = async (data) => {
      const newData = {
         _id: data._id,
         discount: data.discount,
         point_discount: data.point_discount,
         voucher_name: data.voucher_name
      };
      mutate(newData);
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
   const props = { onSubmit, form, title: 'Cập nhật' };
   return (
      <BasicPage currentPage='Thêm voucher' breadcrumbs={breadcrumbs}>
         <BaseFormVoucher {...props} />
      </BasicPage>
   );
}

export default UpdateVoucher;
