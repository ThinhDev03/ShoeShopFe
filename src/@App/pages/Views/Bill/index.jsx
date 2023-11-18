import Scrollbar from '@App/components/customs/Scrollbar';
import useAuth from '@App/hooks/useAuth';
import useDebounceInput from '@App/hooks/useDebounceInput';
import { BILL_STATUS, billStatus, paymentMethod, paymentStatus, transferStatus } from '@App/pages/Admin/Bill/utils';
import billService from '@App/services/bill.service';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import { CoreTableActionView, CoreTableReplay } from '@Core/Components/Table/components/CoreTableActions';
import toFormatMoney from '@Core/Helper/Price';
import {
   Box,
   Chip,
   Container,
   Divider,
   Grid,
   Modal,
   Pagination,
   Paper,
   Stack,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Typography
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BillDetailItem from './components/BillDetailItem';

function Bill() {
   const [open, setOpen] = React.useState(false);
   const { user, isAuththentication } = useAuth();
   const { control, watch } = useForm({ mode: 'onChange', defaultValues: { status: 'PENDING' } });
   const [bill, setBill] = useState({});
   const [page, setPage] = useState(1);

   const statusSelected = watch('status');
   const searchValue = watch('search');

   const search = useDebounceInput(searchValue);

   const {
      data: bills,
      refetch: getbills,
      isFetching: loading
   } = useQuery(
      ['getBill', { page, statusSelected, search }],
      async () => {
         const rest = await billService.list(
            {
               page,
               status: statusSelected,
               search
            },
            '/' + user?._id
         );

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
      mutationFn: async (bill_id) => {
         return await billService.request.get('bill/bill-detail/' + bill_id);
      }
   });

   const handleClickModal = (bill_id) => {
      setOpen(true);
      getBillDetail(bill_id);
      if (bills.data) {
         const bill = bills.data.find((item) => item._id === bill_id);
         console.log(bill);
         setBill(bill);
      }
   };

   const { mutate: cancelBill } = useMutation({
      mutationFn: (id) => {
         return billService.updateStatus(id, BILL_STATUS[4]);
      },
      onSuccess: () => {
         return getbills();
      }
   });

   const handleClose = () => setOpen(false);

   const columns = [
      { label: 'STT', minWidth: 50, align: 'center', format: (v, i) => i + 1 },
      { label: 'Người đặt hàng', minWidth: 170, format: (v) => v.user_id?.fullname },
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
         label: 'Trạng thái thanh toán',
         minWidth: 200,
         align: 'center',
         format: (v) => (
            <Chip
               color={'PAID' === v?.payment_id?.status ? 'secondary' : 'primary'}
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
                  {v.status === BILL_STATUS[0] && 'UNPAID' === v?.payment_id?.status ? (
                     <CoreTableReplay content='Bạn có muốn hủy đơn hàng này?' callback={() => cancelBill(v?._id)} />
                  ) : (
                     <Box display='inline-block' width='37px' height='37px'></Box>
                  )}
               </Box>
            );
         }
      }
   ];
   return (
      <Container
         maxWidth='lg'
         sx={{ py: 3, backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid  #D1D5DB' }}>
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
                        {!loading && bills?.data.length > 0 ? (
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
                           })
                        ) : (
                           <TableRow>
                              <TableCell colSpan={columns.length}>
                                 <Box component='h4' sx={{ color: '#555555', textAlign: 'center' }}>
                                    Chúng tôi không tìm thấy dữ liệu đơn hàng nào của bạn.
                                 </Box>
                              </TableCell>
                           </TableRow>
                        )}
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
               <Typography
                  id='modal-modal-title'
                  variant='h5'
                  component='h2'
                  sx={{
                     px: 3,
                     py: 1,
                     fontSize: '20px !important',
                     fontWeight: 500,
                     border: '1px solid #DADADA'
                  }}>
                  Thông tin hóa đơn
               </Typography>
               <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
                  <Stack gap={1} py={2} px={2}>
                     <Grid container spacing={1}>
                        <Grid item xs={4} sx={{ py: 1 }}>
                           Người Đặt:
                        </Grid>
                        <Grid item xs={8} sx={{ py: 1 }}>
                           {bill?.user_id?.fullname}
                        </Grid>

                        <Grid item xs={4} sx={{ py: 1 }}>
                           Người nhận:
                        </Grid>
                        <Grid item xs={8} sx={{ py: 1 }}>
                           {bill?.receiver}
                        </Grid>

                        <Grid item xs={4} sx={{ py: 1 }}>
                           Số điện thoại
                        </Grid>
                        <Grid item xs={8} sx={{ py: 1 }}>
                           {bill?.phone_number}
                        </Grid>

                        <Grid item xs={4} sx={{ py: 1 }}>
                           Tổng tiền:
                        </Grid>
                        <Grid item xs={8} sx={{ py: 1 }}>
                           <Chip color='secondary' label={toFormatMoney(bill?.total_money)} />
                        </Grid>

                        <Grid item xs={4} sx={{ py: 1 }}>
                           Mã đơn hàng
                        </Grid>
                        <Grid item xs={8} sx={{ py: 1 }}>
                           {bill?._id}
                        </Grid>

                        <Grid item xs={4} sx={{ py: 1 }}>
                           Trạng thái đơng hàng
                        </Grid>
                        <Grid item xs={8} sx={{ py: 1 }}>
                           <Chip
                              variant='outlined'
                              color={BILL_STATUS[3] === bill?.status ? 'secondary' : 'primary'}
                              label={transferStatus[bill?.status]}
                           />
                        </Grid>

                        <Grid item xs={4} sx={{ py: 1 }}>
                           Thanh toán:
                        </Grid>
                        <Grid item xs={8} sx={{ py: 1 }}>
                           <Chip
                              color={'PAID' === bill?.payment_id?.status ? 'secondary' : 'primary'}
                              variant='outlined'
                              label={paymentStatus[bill?.payment_id?.status ? bill?.payment_id?.status : 'UNPAID']}
                           />
                        </Grid>

                        <Grid item xs={4} sx={{ py: 1 }}>
                           Hình thức thanh toán:
                        </Grid>
                        <Grid item xs={8} sx={{ py: 1 }}>
                           <Chip
                              color='default'
                              label={
                                 bill?.payment_id?.payment_method === paymentMethod.PAYMENT_ON_DELIVEY
                                    ? 'Thanh toán khi nhận hàng'
                                    : 'Thanh toán trước'
                              }
                           />
                        </Grid>

                        <Grid item xs={4} sx={{ py: 1 }}>
                           Địa chỉ nhận hàng:
                        </Grid>
                        <Grid item xs={8} sx={{ py: 1 }}>
                           {bill?.address}
                        </Grid>

                        <Grid item xs={4} sx={{ py: 1 }}>
                           Ghi chú:
                        </Grid>
                        <Grid item xs={8} sx={{ py: 1 }}>
                           {bill?.note || ''}
                        </Grid>
                     </Grid>
                     {/* <Box>Thời gian đặt hàng: {format(new Date(bill?.createdAt), 'dd-mm-yyyy')}</Box> */}
                  </Stack>
                  <Divider />
                  <Box
                     sx={{
                        mt: 2,
                        px: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        height: '100%'
                     }}>
                     <Typography
                        id='modal-modal-title'
                        variant='h5'
                        component='h2'
                        sx={{
                           py: 1,
                           fontSize: '20px !important',
                           fontWeight: 500
                        }}>
                        Danh sách sản phẩm
                     </Typography>
                     {!loadingBillDetail && billItemdetail?.data?.map((bill) => <BillDetailItem data={bill} />)}
                  </Box>
               </Box>
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
   width: 700,
   height: 600,
   overflow: 'hidden',
   bgcolor: 'background.paper',
   borderRadius: '8px',
   boxShadow: 24
};

export default Bill;
