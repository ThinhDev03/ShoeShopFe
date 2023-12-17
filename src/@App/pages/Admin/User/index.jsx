import BasicPage from '@App/components/customs/BasicPage';
import authService from '@App/services/auth.service';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import CoreTable, { columnHelper } from '@Core/Components/Table/CoreTable';
import {
   CoreTableActionEdit,
   CoreTableActionLock,
   CoreTableActionStatusChange,
   CoreTableReplay
} from '@Core/Components/Table/components/CoreTableActions';
import { Box, Stack } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { userRole } from './utils';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import useDebounceInput from '@App/hooks/useDebounceInput';

function UserPage() {
   const navigate = useNavigate();
   const { control, watch } = useForm({ mode: 'onChange', defaultValues: { userRole: 'USER' } });
   const [currentPage, setCurrentPage] = useState(1);
   const userRoleSelected = watch('userRole');
   const searchValue = watch('search');
   const search = useDebounceInput(searchValue);

   const {
      data: dataUser,
      isFetching,
      refetch: fetchUser
   } = useQuery(
      ['getListUser', userRoleSelected, search, currentPage],
      async () => {
         const isLockUser = userRoleSelected === userRole[2].value;
         const rest = await authService.list({
            user_role: isLockUser ? '' : userRoleSelected,
            is_locked: isLockUser,
            search,
            page: currentPage
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
   const { mutate: onLockUser } = useMutation({
      mutationFn: async ({ id, isLocked }) => {
         return await authService.locked(id, isLocked);
      },
      onSuccess: () => {
         fetchUser();
         successMessage('Khóa người dùng thành công');
      },
      onError: (err) => {
         errorMessage('Khóa thất bại');
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
         columnHelper.accessor('fullname', {
            header: 'Họ và tên'
         }),
         columnHelper.accessor('username', {
            header: 'Tên đăng nhập'
         }),
         columnHelper.accessor('email', {
            header: 'Email'
         }),
         columnHelper.accessor('phone', {
            header: 'Sô điện thoại'
         }),
         columnHelper.accessor('address', {
            header: 'Địa chỉ'
         }),

         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const user = row?.original;
               const isLockUser = user.is_locked;
               return (
                  <Box sx={{ display: 'flex' }}>
                     <CoreTableActionEdit callback={() => navigate('update/' + user?._id)} />

                     {isLockUser && (
                        <CoreTableReplay
                           content='Bạn có muốn mở khóa tài khoản'
                           okText='Mở khóa'
                           callback={() => onLockUser({ id: user?._id, isLocked: false })}
                        />
                     )}
                     {!isLockUser && (
                        <CoreTableActionLock
                           content='Bạn có muốn khóa tài khoản'
                           callback={() => onLockUser({ id: user?._id, isLocked: true })}
                        />
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
               <ControllerSelect label='Chọn tài khoản' options={userRole} name='userRole' control={control} />
            </Box>
            <Box width={200} mb={3}>
               <ControllerTextField placeholder='Tìm kiếm...' name='search' control={control} />
            </Box>
         </Stack>
         <CoreTable
            pageSize={dataUser.pageSize}
            handleFetchData={fetchUser}
            handleSetCurrentPage={setCurrentPage}
            columns={columns}
            data={dataUser.data}
            isPagination
            loading={isFetching}
         />
      </BasicPage>
   );
}

export default UserPage;
