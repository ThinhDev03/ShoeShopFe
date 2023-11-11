import BasicPage from '@App/components/customs/BasicPage';
import categoryService from '@App/services/category.service';
import CoreTable, { columnHelper } from '@Core/Components/Table/CoreTable';
import { CoreTableActionDelete, CoreTableActionEdit } from '@Core/Components/Table/components/CoreTableActions';
import { successMessage } from '@Core/Helper/Message';
import { Box } from '@mui/material';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function Categories() {
   const navigate = useNavigate();
   const {
      data,
      refetch: getCategory,
      isFetching
   } = useQuery(['getCategory'], async () => {
      const rest = await categoryService.getAll();
      return rest.data;
   });

   const mutation = useMutation({
      mutationFn: async (data) => {
         return await categoryService.deleteCategory(data.id);
      },
      onSuccess: () => {
         successMessage('Xóa sản phẩm thành công');
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
               return (
                  <Box>
                     <CoreTableActionEdit callback={() => navigate(subject._id)} />
                     <CoreTableActionDelete
                        callback={() =>
                           mutation.mutate({
                              id: subject._id
                           })
                        }
                        content='Bạn có chắc chắn muốn xoá?'
                     />
                  </Box>
               );
            }
         })
      ];
   },[]);


   return (
      <BasicPage currentPage='Danh mục sản phẩm'>
         <CoreTable columns={columns} loading={isFetching} data={data} isPagination={false} />
      </BasicPage>
   );
}

export default Categories;
