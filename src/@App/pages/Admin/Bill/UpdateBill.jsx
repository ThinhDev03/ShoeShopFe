import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import BasicPage from '@App/components/customs/BasicPage';
import { useMutation, useQuery } from '@tanstack/react-query';
import BaseFormBill from './components/BaseFormBill';
import billService from '@App/services/bill.service';
import { billStatus } from './utils';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import { useConfirm } from '@Core/Components/Confirm/CoreConfirm';

export default function UpdateBill() {
   const { id } = useParams();
   const navigate = useNavigate();
   const confirm = useConfirm();

   const form = useForm({
      mode: 'onChange'
   });
   const { data } = useQuery(
      ['getListBill', id],
      async () => {
         const rest = await billService.find('by-id/' + id);
         return rest;
      },
      {
         onSuccess(data) {
            const extendData = data.data;
            form.reset({
               ...extendData,
               user_order: extendData.user_id?.fullname,
               payment_method: extendData?.payment_id ? extendData.payment_id.payment_method : '',
               payment_status: extendData?.payment_id ? extendData.payment_id.status : '',
               payment_id: extendData?.payment_id ? extendData.payment_id._id : ''
            });
         },
         initialData: { billDetail: [] }
      }
   );
   const { mutate: onChangeStatus } = useMutation({
      mutationFn: async ({ id, ...rest }) => {
         return await billService.updateStatus(id, rest);
      },
      onSuccess: () => {
         successMessage('Cập nhật đơn hàng thành công');
         navigate('/admin/bill');
      },
      onError: (err) => {
         errorMessage('Cập nhật đơn hàng thất bại');
      }
   });

   const onSubmit = (data) => {
      confirm({
         title: 'Cập nhật trạng thái đơn hàng.',
         content: 'Bạn có chắc muốn cập nhật trạng thái của đơn hàng?',
         okText: 'Cập nhật',
         onOk: () => {
            onChangeStatus({
               id: data._id,
               status: data.status,
               payment_id: data.payment_id,
               payment_status: data.payment_status
            });
         }
      });
   };
   const props = {
      billDetail: data.billDetail,
      billStatus,
      form,
      onSubmit
   };
   const breadcrumbs = [
      {
         name: 'Trang chủ',
         link: '/'
      },
      {
         name: 'Đơn hàng',
         link: '/bill'
      }
   ];
   return (
      <BasicPage currentPage='Cập nhật' breadcrumbs={breadcrumbs}>
         <BaseFormBill {...props} />
      </BasicPage>
   );
}
