import BasicPage from '@App/components/customs/BasicPage';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import CoreTable, { columnHelper } from '@Core/Components/Table/CoreTable';
import { Box, Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BILL_STATUS, billStatus, paymentStatus, transferStatus } from './utils';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import useDebounceInput from '@App/hooks/useDebounceInput';
import billService from '@App/services/bill.service';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CoreTableActionEdit } from '@Core/Components/Table/components/CoreTableActions';

function BillPage() {
   const navigate = useNavigate();
   const { control, watch } = useForm({ mode: 'onChange', defaultValues: { status: 'PENDING' } });
   const [currentPage, setCurrentPage] = useState(1);
   const statusSelected = watch('status');
   const searchValue = watch('search');
   const phoneValue = watch('phone');

   const search = useDebounceInput(searchValue);
   const phone = useDebounceInput(phoneValue);

   const {
      data: dataBill,
      isFetching,
      refetch: fetchBill
   } = useQuery(
      ['getBills', statusSelected, search, currentPage, phone],
      async () => {
         const rest = await billService.list({
            search,
            phone,
            status: statusSelected,
            page: currentPage
         });

         return rest;
      },
      {
         initialData: {
            data: []
         }
      }
   );
   const { mutate: onChangeStatus } = useMutation({
      mutationFn: async ({ id, status }) => {
         return await billService.updateStatus(id, status);
      },
      onSuccess: () => {
         fetchBill();
         successMessage('Cập nhật đơn hàng thành công');
      },
      onError: (err) => {
         errorMessage('Cập nhật đơn hàng thất bại');
      }
   });

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            header: 'STT',
            cell: ({ row }) => {
               return <Box width={100}>{row.index + 1}</Box>;
            }
         }),
         columnHelper.accessor('receiver', {
            header: 'Người nhận'
         }),
         columnHelper.accessor('status', {
            header() {
               return <Typography width='180px'>Trạng thái đơn hàng</Typography>;
            },
            cell({ getValue }) {
               return (
                  <Chip
                     variant='outlined'
                     color={BILL_STATUS[3] === getValue() ? 'secondary' : 'primary'}
                     label={transferStatus[getValue()]}
                  />
               );
            }
         }),
         columnHelper.accessor('phone_number', {
            header: 'Sô điện thoại'
         }),
         columnHelper.accessor('payment_id.status', {
            header() {
               return <Typography width='180px'>Trạng thái thanh toán</Typography>;
            },
            cell({ getValue }) {
               const status = getValue();
               return (
                  <Chip
                     color={paymentStatus.PAID === getValue() ? 'secondary' : 'primary'}
                     variant='outlined'
                     label={paymentStatus[status ? status : 'UNPAID']}
                  />
               );
            }
         }),

         columnHelper.accessor('total_money', {
            header: 'Tổng tiền'
         }),
         columnHelper.accessor('user_id.fullname', {
            header() {
               return <Typography width='180px'>Tài khoản đặt hàng</Typography>;
            }
         }),
         columnHelper.accessor('note', {
            header: 'Ghi chú'
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const bill = row?.original;
               return (
                  <Box sx={{ display: 'flex' }}>
                     {bill.status === BILL_STATUS[0] && (
                        <Tooltip title='Xác nhận'>
                           <IconButton onClick={() => onChangeStatus({ id: bill._id, status: BILL_STATUS[1] })}>
                              <CheckCircleIcon />
                           </IconButton>
                        </Tooltip>
                     )}
                     {bill.status !== BILL_STATUS[0] && (
                        <CoreTableActionEdit callback={() => navigate('update/' + bill._id)} />
                     )}
                  </Box>
               );
            }
         })
      ];
   }, []);

   return (
      <BasicPage currentPage='Người dùng'>
         <Stack direction='row' gap={3}>
            <Box width={200} mb={3}>
               <ControllerSelect label='Trạng thái đơn hàng' options={billStatus} name='status' control={control} />
            </Box>
            <Box width={200} mb={3}>
               <ControllerTextField placeholder='Tìm tên người nhận' name='search' control={control} />
            </Box>
         </Stack>
         <CoreTable
            pageSize={dataBill.pageSize}
            handleFetchData={fetchBill}
            handleSetCurrentPage={setCurrentPage}
            columns={columns}
            data={dataBill.data}
            isPagination
            loading={isFetching}
         />
      </BasicPage>
   );
}

export default BillPage;
