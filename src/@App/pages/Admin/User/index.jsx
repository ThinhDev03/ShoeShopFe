import BasicPage from '@App/components/customs/BasicPage';
import authService from '@App/services/auth.service';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import CoreTable, { columnHelper } from '@Core/Components/Table/CoreTable';
import { CoreTableActionEdit } from '@Core/Components/Table/components/CoreTableActions';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { users } from './utils';

function UserPage() {
   const navigate = useNavigate();

   const { data: dataUser, isFetching } = useQuery(['getListUser'], async () => {
      const rest = await authService.list();
      return rest.data;
   });

   const { control } = useForm();

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
               const subject = row?.original;
               return (
                  <Box sx={{ display: 'flex' }}>
                     <CoreTableActionEdit callback={() => navigate(subject?._id)} />
                  </Box>
               );
            }
         })
      ];
   }, []);

   return (
      <BasicPage currentPage='Người dùng'>
         <Box width={400} my={4}>
            <ControllerSelect options={users} name='gender' control={control} />
         </Box>
         <CoreTable columns={columns} data={dataUser} isPagination={false} loading={isFetching} />
      </BasicPage>
   );
}

export default UserPage;
