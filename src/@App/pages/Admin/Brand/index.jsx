import BasicPage from '@App/components/customs/BasicPage';
import { ROLE } from '@App/configs/role';
import PermissionRestricted from '@App/routers/components/PermissionRestricted';
import brandService from '@App/services/brand.service';
import categoryService from '@App/services/category.service';
import CoreTable, { columnHelper } from '@Core/Components/Table/CoreTable';
import { CoreTableActionDelete, CoreTableActionEdit } from '@Core/Components/Table/components/CoreTableActions';
import { successMessage } from '@Core/Helper/Message';
import { Box, TextField } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function Brand() {
   const navigate = useNavigate();
   const {
      data,
      refetch: getCategory,
      isFetching
   } = useQuery(['getCategory'], async () => {
      const rest = await brandService.getAll();
      return rest.data;
   });

   const mutation = useMutation({
      mutationFn: async (data) => {
         return await brandService.deleteBrand(data.id);
      },
      onSuccess: () => {
         successMessage('Xóa thương hiệu thành công');
         getCategory();
      }
   });

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((row, index) => index + 1, {
            header: 'STT'
         }),
         columnHelper.accessor('brand_name', {
            header: 'Tên thương hiệu'
         }),
         columnHelper.accessor('origin', {
            header: 'Nguồn gốc'
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
                     <PermissionRestricted roleNames={ROLE[1]}>
                        <CoreTableActionDelete
                           callback={() =>
                              mutation.mutate({
                                 id: subject._id
                              })
                           }
                           content='Bạn có muốn xoá?'
                        />
                     </PermissionRestricted>
                  </Box>
               );
            }
         })
      ];
   }, []);

   return (
      <BasicPage currentPage='Thương hiệu'>
         <CoreTable columns={columns} loading={isFetching} data={data} isPagination={true} />
      </BasicPage>
   );
}

export default Brand;
