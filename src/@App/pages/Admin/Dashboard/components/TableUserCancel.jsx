import authService from '@App/services/auth.service';
import statisticService from '@App/services/statistic.service';
import {
   CoreTableActionEdit,
   CoreTableActionLock,
   CoreTableActionView
} from '@Core/Components/Table/components/CoreTableActions';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function TableUserCanceled() {
   const navigate = useNavigate();

   const { data, refetch } = useQuery(
      ['get-user-cancel'],
      async () => {
         const res = await statisticService.getUserCancel();
         return res.data;
      },
      {
         initialData: [],
         staleTime: 0,
         cacheTime: 0
      }
   );

   const { mutate: onLockUser } = useMutation({
      mutationFn: async ({ id, isLocked }) => {
         return await authService.locked(id, isLocked);
      },
      onSuccess: () => {
         refetch();
         successMessage('Khóa người dùng thành công');
      },
      onError: (err) => {
         errorMessage('Khóa thất bại');
      }
   });

   return (
      <Paper sx={{ borderRadius: 2, overflow: 'hidden', padding: 4 }}>
         <Typography variant='h6'>Thống kê tài khoản hủy đơn hàng nhiều nhất</Typography>
         <Stack direction='row' sx={{ borderBottom: '1px solid #ccc' }}>
            <Typography sx={{ flex: 1, fontWeight: '600', fontSize: '20px', py: 2 }}>Tên tài khoản</Typography>
            <Typography sx={{ flex: 1, fontWeight: '600', fontSize: '20px', py: 2 }}>Vai trò</Typography>
            <Typography sx={{ flex: 1, fontWeight: '600', fontSize: '20px', py: 2 }}>Số lần hủy đơn hàng</Typography>
            <Typography sx={{ flex: 1, fontWeight: '600', fontSize: '20px', py: 2 }}>Hành động</Typography>
         </Stack>
         {data &&
            data.map((item) => {
               return (
                  <Stack direction='row' key={item._id}>
                     <Box sx={{ display: 'flex', alingItems: 'center', flex: 1, borderBottom: '1px solid #ccc' }}>
                        <p>{item.userName}</p>
                     </Box>
                     <Box sx={{ display: 'flex', alingItems: 'center', flex: 1, borderBottom: '1px solid #ccc' }}>
                        <p>{item.role}</p>
                     </Box>
                     <Box sx={{ display: 'flex', alingItems: 'center', flex: 1, borderBottom: '1px solid #ccc' }}>
                        <p> {item.count}</p>
                     </Box>
                     <Box sx={{ display: 'flex', alingItems: 'center', flex: 1, borderBottom: '1px solid #ccc' }}>
                        <CoreTableActionView callback={() => navigate('user/update/' + item._id)} />
                        {item.role !== 'ADMIN' && (
                           <CoreTableActionLock
                              content='Bạn có muốn khóa tài khoản'
                              callback={() => onLockUser({ id: item._id, isLocked: true })}
                           />
                        )}
                     </Box>
                  </Stack>
               );
            })}
      </Paper>
   );
}

export default TableUserCanceled;
