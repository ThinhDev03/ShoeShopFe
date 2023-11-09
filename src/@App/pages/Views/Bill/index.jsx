import Scrollbar from '@App/components/customs/Scrollbar';
import useAuth from '@App/hooks/useAuth';
import useDebounceInput from '@App/hooks/useDebounceInput';
import { BILL_STATUS, billStatus, paymentStatus, transferStatus } from '@App/pages/Admin/Bill/utils';
import billService from '@App/services/bill.service';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import {
   CoreTableActionDelete,
   CoreTableActionEdit,
   CoreTableActionView,
   CoreTableReplay
} from '@Core/Components/Table/components/CoreTableActions';
import toFormatMoney from '@Core/Helper/Price';
import {
   Box,
   Chip,
   Container,
   Modal,
   Pagination,
   Paper,
   Stack,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TablePagination,
   TableRow,
   TextField,
   Typography
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import BillDetailItem from './components/BillDetailItem';

function Bill() {
   const [open, setOpen] = React.useState(false);
   const { user } = useAuth();
   const { control, watch } = useForm({ mode: 'onChange', defaultValues: { status: 'PENDING' } });
   const [page, setPage] = useState(1);

   const statusSelected = watch('status');
   const searchValue = watch('search');

   const search = useDebounceInput(searchValue);

   const { data: bills, isFetching: loading } = useQuery(
      ['getBill', { page, statusSelected, searchValue }],
      async () => {
         const rest = await billService.list({
            search,
            status: statusSelected,
            page
         });

         return rest;
      },
      {
         initialData: {
            data: [],
            pageSize: 1
         }
      }
   );

   const {
      data: billItemdetail,
      mutate: getBillDetail,
      isFetching: loadingBillDetail
   } = useMutation({
      mutationFn: (bill_id) => {
         return billService.request.get('bill/bill-detail/' + bill_id);
      }
   });

   const handleClickModal = (bill_id) => {
      setOpen(true);
      getBillDetail(bill_id);
   };

   const handleClose = () => setOpen(false);

   const columns = [
      { label: 'STT', minWidth: 50, align: 'center', format: (v, i) => i + 1 },
      { label: 'Người đặt hàng', minWidth: 170, format: (v) => v.user_id.fullname },
      {
         label: 'Người nhận hàng',
         minWidth: 170,
         align: 'left',
         format: (v) => v.receiver
      },
      {
         label: 'Só điện thoại',
         minWidth: 170,
         align: 'left',
         format: (v) => v.phone_number
      },
      {
         label: 'Tổng tiền',
         minWidth: 170,
         align: 'left',
         format: (v) => toFormatMoney(v.total_money)
      },
      {
         label: 'Trạng thái đơn hàng',
         minWidth: 170,
         align: 'left',
         format: (v) => (
            <Chip
               variant='outlined'
               color={BILL_STATUS[3] === v?.status ? 'secondary' : 'primary'}
               label={transferStatus[v?.status]}
            />
         )
      },
      {
         path_1: 'payment_id',
         label: 'Trạng thái đơn hàng',
         minWidth: 170,
         align: 'center',
         format: (v) => (
            <Chip
               color={paymentStatus.PAID === v?.payment_id?.status ? 'secondary' : 'primary'}
               variant='outlined'
               label={paymentStatus[v?.payment_id?.status ? v?.payment_id?.status : 'UNPAID']}
            />
         )
      },
      {
         path_1: 'createdAt',
         label: 'Thời gian đặt hàng',
         minWidth: 170,
         align: 'center',
         format: (v) => format(new Date(v.createdAt), 'dd-mm-yyyy')
      },
      {
         path_1: '',
         label: 'Thao tác',
         minWidth: 170,
         align: 'center',
         format: (v, i) => {
            return (
               <Box>
                  <CoreTableActionView callback={() => handleClickModal(v._id)} />
                  {v.status === BILL_STATUS[0] ? (
                     <CoreTableReplay content='Bạn có muốn hủy đơn hàng này?' />
                  ) : (
                     <Box display='inline-block' width='37px' height='37px'></Box>
                  )}
               </Box>
            );
         }
      }
   ];

   return (
      <Container maxWidth='lg' sx={{ py: 3 }}>
         <Stack direction='row' gap={3}>
            <Box width={200} mb={3}>
               <ControllerSelect label='Trạng thái đơn hàng' options={billStatus} name='status' control={control} />
            </Box>
            <Box width={200} mb={3}>
               <ControllerTextField placeholder='Tìm tên người nhận' name='search' control={control} />
            </Box>
         </Stack>
         <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={0}>
            <TableContainer
               sx={{
                  position: 'relative',
                  border: 'none',
                  height: 400,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column'
               }}>
               <Scrollbar
                  sx={{
                     flex: 1,
                     height: '100%'
                  }}>
                  <Table stickyHeader aria-label='sticky table'>
                     <TableHead>
                        <TableRow>
                           {columns.map((column, index) => (
                              <TableCell key={index} style={{ minWidth: column.minWidth }}>
                                 {column.label}
                              </TableCell>
                           ))}
                        </TableRow>
                     </TableHead>
                     <TableBody sx={{ height: '100%' }}>
                        {!loading &&
                           bills?.data?.map((row, i) => {
                              return (
                                 <TableRow hover role='checkbox' tabIndex={-1} key={row._id}>
                                    {columns.map((column, index) => {
                                       return (
                                          <TableCell
                                             key={index}
                                             align={column.align}
                                             sx={{ padding: '12px 16px !important' }}>
                                             {column.format && column.format(row, i)}
                                          </TableCell>
                                       );
                                    })}
                                 </TableRow>
                              );
                           })}
                     </TableBody>
                  </Table>
               </Scrollbar>
            </TableContainer>
            <Box
               sx={({ palette }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  pt: 1,
                  backgroundColor: palette.neutral.ultralight,
                  padding: '4px'
               })}>
               <Pagination
                  onChange={(_, page) => {
                     setPage(page);
                  }}
                  count={bills?.totalPage}
                  variant='outlined'
                  shape='rounded'
               />
            </Box>
         </Paper>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'>
            <Box sx={style}>
               <Scrollbar>
                  <Typography
                     id='modal-modal-title'
                     variant='h6'
                     component='h2'
                     sx={{ px: 3, py: 2, bgcolor: '#dadada52' }}>
                     Chi tiết hóa đơn
                  </Typography>
                  <Box sx={{ mt: 2, px: 2, display: 'flex', flexDirection: 'column', gap: 1, height: '100%' }}>
                     {!loadingBillDetail && billItemdetail?.data?.map((bill) => <BillDetailItem data={bill} />)}
                  </Box>
               </Scrollbar>
            </Box>
         </Modal>
      </Container>
   );
}

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 650,
   height: 600,
   bgcolor: 'background.paper',
   borderRadius: 1,
   boxShadow: 24
};

export default Bill;
