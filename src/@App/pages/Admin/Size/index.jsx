import BasicPage from '@App/components/customs/BasicPage';
import { ROLE } from '@App/configs/role';
import PermissionRestricted from '@App/routers/components/PermissionRestricted';
import classesService from '@App/services/category.service';
import sizeService from '@App/services/size.service';
import CoreTable, { columnHelper } from '@Core/Components/Table/CoreTable';
import { CoreTableActionDelete, CoreTableActionEdit } from '@Core/Components/Table/components/CoreTableActions';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import { Box } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Size() {
   const navigate = useNavigate();

   const {
      data: dataSize,
      refetch: getCategory,
      isFetching
   } = useQuery(['getColor'], async () => {
      const rest = await sizeService.getAll();
      return rest.data;
   });

   const mutation = useMutation({
      mutationFn: async (data) => {
         return await sizeService.deleteSize(data.id);
      },
      onSuccess: () => {
         successMessage('Xóa kích thước thành công!');
         getCategory();
      },
      onError: (error) => {
         errorMessage(error);
      }
   });

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            header: 'STT'
         }),
         columnHelper.accessor('size_name', {
            header: 'Tên kích thước'
         }),
         columnHelper.accessor('description', {
            header: 'Mô tả'
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const subject = row?.original;
               return (
                  <Box>
                     <CoreTableActionEdit callback={() => navigate(subject?._id)} />
                     <PermissionRestricted roleNames={ROLE[1]}>
                        <CoreTableActionDelete
                           callback={() => {
                              mutation.mutate({
                                 id: subject?._id
                              });
                           }}
                           content='Bạn có muốn xoá size này?'
                        />
                     </PermissionRestricted>
                  </Box>
               );
            }
         })
      ];
   }, []);

   return (
      <BasicPage currentPage='Kích thước' createTitle='Tạo mới'>
         <CoreTable columns={columns} data={dataSize} isPagination={false} loading={isFetching} />
      </BasicPage>
   );
}
