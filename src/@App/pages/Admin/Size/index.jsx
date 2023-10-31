import BasicPage from '@App/components/customs/BasicPage';
import classesService from '@App/services/category.service';
import sizeService from '@App/services/size.service';
import CoreTable, { columnHelper } from '@Core/Components/Table/CoreTable';
import { CoreTableActionDelete, CoreTableActionEdit } from '@Core/Components/Table/components/CoreTableActions';
import useCoreTable from '@Core/Components/Table/hooks/useCoreTable';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import { Box } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRequest } from 'ahooks';
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
         successMessage('Xóa sản phảm thành công');
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
            header: 'Tên Size'
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
                     <CoreTableActionDelete
                        callback={() => {
                           mutation.mutate({
                              id: subject?._id
                           });
                        }}
                        content='Bạn có muốn xoá size này?'
                     />
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
