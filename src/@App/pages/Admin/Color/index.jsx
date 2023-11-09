import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import { successMessage } from '@Core/Helper/Message';
import colorService from '@App/services/color.service';
import BasicPage from '@App/components/customs/BasicPage';
import CoreTable, { columnHelper } from '@Core/Components/Table/CoreTable';
import { CoreTableActionDelete, CoreTableActionEdit } from '@Core/Components/Table/components/CoreTableActions';


export default function Color() {
   const navigate = useNavigate();
   const {
      data: dataColor,
      refetch: getCategory,
      isFetching
   } = useQuery(['getColor'], async () => {
      const rest = await colorService.getAll();
      return rest.data;
   });

   const mutation = useMutation({
      mutationFn: async (data) => {
         return await colorService.deleteColor(data.id);
      },
      onSuccess: () => {
         successMessage('Xóa sản phẩm thành công');
         getCategory();
      }
   });

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            header: 'STT'
         }),
         columnHelper.accessor('color_name', {
            header: 'Tên màu'
         }),
         columnHelper.accessor('color_code', {
            header: 'Mã màu'
         }),
         columnHelper.accessor('', {
            header: 'Màu',
            cell: ({ row }) => {
               const subject = row?.original;
               return (
                  <Box
                     sx={{
                        width: 68,
                        height: 32,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        backgroundColor: subject.color_code
                     }}></Box>
               );
            }
         }),
         columnHelper.accessor('description', {
            header: 'Mô tả',
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const subject = row?.original;
               return (
                  <Box>
                     <CoreTableActionEdit callback={() => navigate(subject?._id)} />
                     <CoreTableActionDelete
                        callback={() =>
                           mutation.mutate({
                              id: subject?._id
                           })
                        }
                        content='Bạn có chắc chắn muốn xoá?'
                     />
                  </Box>
               );
            }
         })
      ];
   }, []);

   return (
      <BasicPage currentPage='Color' createTitle='Tạo mới'>
         <CoreTable columns={columns} data={dataColor} isPagination={false} loading={isFetching} />
      </BasicPage>
   );
}
