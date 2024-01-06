import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { paymentStatus, roleHistory, transferStatus } from '../utils';
import moment from 'moment';

function BillHistory({ billHistoryData }) {
   return (
      <Box my={6}>
         <Divider />
         <Typography my={3} variant='h5'>
            Lịch sử cập nhật đơn hàng.
         </Typography>
         <Stack direction='row' sx={{ borderBottom: '1px solid #ccc' }}>
            <Typography sx={{ flex: 1, fontSize: '20px', fontWeight: '600', padding: '4px' }}>
               Người sửa đơn hàng
            </Typography>
            <Typography sx={{ flex: 1, fontSize: '20px', fontWeight: '600', padding: '4px' }}>Vai trò</Typography>
            <Typography sx={{ flex: 1, fontSize: '20px', fontWeight: '600', padding: '4px' }}>
               Trạng thái thanh toán
            </Typography>

            <Typography sx={{ flex: 1, fontSize: '20px', fontWeight: '600', padding: '4px' }}>
               Trạng thái đơn hàng
            </Typography>
            <Typography sx={{ flex: 1, fontSize: '20px', fontWeight: '600', padding: '4px' }}>Thời gian</Typography>
         </Stack>
         {billHistoryData?.map((item) => {
            const status = item.bill_status;
            const payment_status = item.payment_status;
            return (
               <Stack direction='row' sx={{ borderBottom: '1px solid #ccc' }}>
                  <Box sx={{ flex: 1, padding: '4px' }}> {item.user_updated.fullname}</Box>
                  <Box sx={{ flex: 1, padding: '4px' }}> {roleHistory[item.user_updated.role]}</Box>
                  <Box sx={{ flex: 1, padding: '4px' }}>
                     {paymentStatus[payment_status ? payment_status : 'UNPAID']}
                  </Box>
                  <Box sx={{ flex: 1, padding: '4px' }}> {transferStatus[status]}</Box>
                  <Box sx={{ flex: 1, padding: '4px' }}> {moment(item.createdAt).format('HH:mm:ss YYYY/MM/DD')}</Box>
               </Stack>
            );
         })}
      </Box>
   );
}

export default BillHistory;
