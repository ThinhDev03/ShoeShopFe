import BasicPage from '@App/components/customs/BasicPage';
import { ROLE } from '@App/configs/role';
import PermissionRestricted from '@App/routers/components/PermissionRestricted';
import categoryService from '@App/services/category.service';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import CoreTable, { columnHelper } from '@Core/Components/Table/CoreTable';
import {
   CoreTableActionDelete,
   CoreTableActionEdit,
   CoreTableActionLock,
   CoreTableReplay
} from '@Core/Components/Table/components/CoreTableActions';
import { successMessage } from '@Core/Helper/Message';
import { Box, Stack } from '@mui/material';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryTypes } from './utils';
import { useForm } from 'react-hook-form';

function Categories() {
   const navigate = useNavigate();

   const { control, watch } = useForm({
      mode: 'onChange',
      defaultValues: { isLocked: false }
   });
   const is_locked = watch('isLocked');
   const {
      data,
      refetch: getCategory,
      isFetching
   } = useQuery(['getCategory', is_locked], async () => {
      const rest = await categoryService.list({ is_locked });
      return rest.data;
   });

   const mutationUnlock = useMutation({
      mutationFn: async ({ id }) => {
         return await categoryService.updateOne({ is_locked: false }, id);
      },
      onSuccess: () => {
         successMessage('Khóa danh mục thành công');
         getCategory();
      }
   });
   const mutationlock = useMutation({
      mutationFn: async ({ id }) => {
         return await categoryService.updateOne({ is_locked: true }, id);
      },
      onSuccess: () => {
         successMessage('Khóa danh mục thành công');
         getCategory();
      }
   });

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((row, index) => index + 1, {
            header: 'STT'
         }),
         columnHelper.accessor('category_name', {
            header: 'Tên danh mục'
         }),
         columnHelper.accessor('description', {
            header: 'Mô tả'
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const subject = row?.original;
               const isLocked = subject?.is_locked;

               return (
                  <Box>
                     <CoreTableActionEdit callback={() => navigate(subject._id)} />
                     {!isLocked && (
                        <PermissionRestricted roleNames={ROLE[1]}>
                           <CoreTableActionLock
                              callback={() => {
                                 mutationlock.mutate({
                                    id: subject?._id
                                 });
                              }}
                              content='Bạn có muốn khóa danh mục?'
                           />
                        </PermissionRestricted>
                     )}
                     {isLocked && (
                        <PermissionRestricted roleNames={ROLE[1]}>
                           <CoreTableReplay
                              okText='Mở khóa'
                              callback={() => {
                                 mutationUnlock.mutate({
                                    id: subject?._id
                                 });
                              }}
                              content='Bạn có muốn mở khóa danh mục?'
                           />
                        </PermissionRestricted>
                     )}
                  </Box>
               );
            }
         })
      ];
   }, []);

   return (
      <BasicPage currentPage='Danh mục sản phẩm'>
         <Stack direction='row' gap={3}>
            <Box width={200} mb={3}>
               <ControllerSelect
                  label='Trạng thái hoạt động'
                  options={categoryTypes}
                  name='isLocked'
                  control={control}
               />
            </Box>
         </Stack>
         <CoreTable columns={columns} loading={isFetching} data={data} isPagination={false} />
      </BasicPage>
   );
}

export default Categories;
