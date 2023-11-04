import BasicPage from '@App/components/customs/BasicPage';
import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';
import productService from '@App/services/product.service';
import CoreTable, { columnHelper } from '@Core/Components/Table/CoreTable';
import {
   CoreTableActionDelete,
   CoreTableActionEdit,
   CoreTableActionView
} from '@Core/Components/Table/components/CoreTableActions';
import { successMessage } from '@Core/Helper/Message';
import toFormatPrice from '@Core/Helper/Price';
import { Box, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductPage() {
   const navigate = useNavigate();
   const {
      data: dataProducts,
      refetch: getCategory,
      isFetching
   } = useQuery(['getProduct'], async () => {
      const rest = await productService.getAll();
      return rest.data;
   });

   const mutation = useMutation({
      mutationFn: async ({ id }) => {
         return await productService.deleteProduct(id);
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
                  <Box sx={{ width: 70, height: 70, borderRadius: 2, overflow: 'hidden' }}>
                     <LazyLoadingImage src={subject?.thumbnail} />
                  </Box>
               );
            }
         }),
         columnHelper.accessor('name', {
            header: 'Tên sản phẩm',
            cell: ({ row }) => {
               const subject = row?.original;
               return (
                  <Typography
                     sx={{ display: 'flex', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                     {subject?.name}
                  </Typography>
               );
            }
         }),
         columnHelper.accessor('', {
            header: 'Giá bán',
            cell: ({ row }) => {
               const data = row?.original;
               return (
                  <Box sx={{ display: 'flex', gap: 2 }}>
                     <Typography>{toFormatPrice(data?.fromPrice)}</Typography>
                     <span> - </span>
                     <Typography>{toFormatPrice(data?.toPrice)}</Typography>
                  </Box>
               );
            }
         }),
         columnHelper.accessor('', {
            header: 'Thương hiệu',
            cell: ({ row }) => {
               const subject = row?.original;
               return subject?.brand_id?.brand_name;
            }
         }),
         columnHelper.accessor('', {
            header: 'Danh mục',
            cell: ({ row }) => {
               const subject = row?.original;
               return <Typography>{subject?.category_id?.category_name}</Typography>;
            }
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const product = row?.original;
               return (
                  <Box sx={{ display: 'flex' }}>
                     <CoreTableActionEdit callback={() => navigate('save?id=' + product?._id)} />
                     <CoreTableActionView callback={() => navigate('comment/' + product?._id)} title='Xem Bình luận' />
                     <CoreTableActionDelete
                        callback={() =>
                           mutation.mutate({
                              id: product?._id
                           })
                        }
                        content='Bạn có muốn xoá sản phẩm?'
                     />
                  </Box>
               );
            }
         })
      ];
   }, []);

   return (
      <BasicPage currentPage='Products'>
         <CoreTable columns={columns} data={dataProducts} isPagination={true} loading={isFetching} />
      </BasicPage>
   );
}

export default ProductPage;
