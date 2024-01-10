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
import useAuth from '@App/hooks/useAuth';
import BillHistories from './components/BillHistories';

export default function UpdateBill() {
   const { id } = useParams();
   const { user } = useAuth();
   const confirm = useConfirm();
   const navigate = useNavigate();

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

   const billhistory = useQuery(['bill-history'], async () => {
      const res = await billService.find('bill-history/' + id);
      return res.data;
   });

   console.log(billhistory.data);

   const { mutate: onChangeStatus } = useMutation({
      mutationFn: async ({ id, ...rest }) => {
         return await billService.updateStatus(id, rest);
      },
      onSuccess: () => {
         billhistory.refetch();
         navigate('/admin/bill');
         successMessage('Cập nhật đơn hàng thành công');
      },
      onError: (err) => {
         errorMessage('Cập nhật đơn hàng thất bại');
      }
   });

   const onSubmit = (body) => {
      confirm({
         title: 'Cập nhật trạng thái đơn hàng.',
         content: 'Bạn có chắc muốn cập nhật trạng thái của đơn hàng?',
         okText: 'Cập nhật',
         onOk: () => {
            onChangeStatus({
               id: body._id,
               status: body.status,
               payment_id: body.payment_id,
               payment_status: body.payment_status,
               products: data.billDetail,
               user_updated: user._id
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
         link: '/admin/bill'
      }
   ];

   return (
      <BasicPage currentPage='Cập nhật' breadcrumbs={breadcrumbs}>
         <BaseFormBill {...props} />
         {billhistory.data && <BillHistories billHistoryData={billhistory.data} />}
      </BasicPage>
   );
}
