import BasicPage from '@App/components/customs/BasicPage';
import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';
import productService from '@App/services/product.service';
import CoreTable, { columnHelper } from '@Core/Components/Table/CoreTable';
import {
   CoreTableActionDelete,
   CoreTableActionEdit,
   CoreTableVariation
} from '@Core/Components/Table/components/CoreTableActions';
import { Box } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductPage() {
   const navigate = useNavigate();
   const {
      data: dataColor,
      refetch: getCategory,
      isFetching
   } = useQuery(['getProduct'], async () => {
      const rest = await productService.getAll();
      console.log(rest.data);
      return rest.data;
   });

   const mutation = useMutation({
      mutationFn: async ({ id }) => {
         return await productService.getAll(id);
      },
      onSuccess: () => {
         successMessage('Xóa sản phảm thành công');
         getCategory();
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
         columnHelper.accessor('', {
            header: 'Hình ảnh',
            cell: ({ row }) => {
               const subject = row?.original;
               return (
                  <Box sx={{ width: 100, height: 100 }}>
                     <LazyLoadingImage src={subject.thumbnail} />
                  </Box>
               );
            }
         }),
         columnHelper.accessor('name', {
            header: 'Tên sản phẩm'
         }),
         columnHelper.accessor('', {
            header: 'Thương hiệu',
            cell: ({ row }) => {
               const subject = row?.original;
               return subject.brand_id.brand_name;
            }
         }),
         columnHelper.accessor('', {
            header: 'Danh mục',
            cell: ({ row }) => {
               const subject = row?.original;
               return subject.category_id.category_name;
            }
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const subject = row?.original;
               return (
                  <Box>
                     <CoreTableVariation callback={() => navigate('create/' + subject._id)} />
                     <CoreTableActionEdit callback={() => navigate(subject?._id)} />
                     <CoreTableActionDelete
                        callback={() =>
                           mutation.mutate({
                              id: subject?._id
                           })
                        }
                        content='Bạn có muốn xoá môn học này?'
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

export default ProductPage;
