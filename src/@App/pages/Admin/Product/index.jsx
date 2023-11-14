import BasicPage from '@App/components/customs/BasicPage';
import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';
import { ROLE } from '@App/configs/role';
import useDebounceInput from '@App/hooks/useDebounceInput';
import PermissionRestricted from '@App/routers/components/PermissionRestricted';
import brandService from '@App/services/brand.service';
import categoryService from '@App/services/category.service';
import productService from '@App/services/product.service';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import CoreTable, { columnHelper } from '@Core/Components/Table/CoreTable';
import {
   CoreTableActionDelete,
   CoreTableActionEdit,
   CoreTableActionView
} from '@Core/Components/Table/components/CoreTableActions';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import toFormatPrice from '@Core/Helper/Price';
import { Box, Stack, Typography } from '@mui/material';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function ProductPage() {
   const navigate = useNavigate();
   const [currentPage, setCurrentPage] = useState(1);

   const { control, watch } = useForm({
      mode: 'onChange',
      defaultValues: { categorySelected: '', status: '' }
   });
   const categorySelected = watch('category');
   const searchValue = watch('search');

   const search = useDebounceInput(searchValue);

   const {
      data: dataProducts,
      refetch: getProduct,
      isFetching
   } = useQuery(['getProduct', currentPage, categorySelected, search], async () => {
      const rest = await productService.list({
         search,
         category: categorySelected,
         page: currentPage
      });
      return rest;
   });

   const mutation = useMutation({
      mutationFn: async ({ id }) => {
         return await productService.deleteProduct(id);
      },
      onSuccess: () => {
         successMessage('Xóa sản phảm thành công');
         getProduct();
      }
   });

   const [categories, brands] = useQueries({
      queries: [
         {
            queryKey: ['getCategory'],
            queryFn: async () => {
               const rest = await categoryService.getAll();
               return rest.data;
            },
            onError: () => {
               errorMessage();
            }
         },
         {
            queryKey: ['getBrand'],
            queryFn: async () => {
               const rest = await brandService.getAll();
               return rest.data;
            },
            onError: () => {
               errorMessage();
            }
         }
      ]
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
                     <PermissionRestricted roleNames={ROLE[1]}>
                        <CoreTableActionDelete
                           callback={() =>
                              mutation.mutate({
                                 id: product?._id
                              })
                           }
                           content='Bạn có muốn xoá sản phẩm?'
                        />
                     </PermissionRestricted>
                  </Box>
               );
            }
         })
      ];
   }, []);

   return (
      <BasicPage currentPage='Products'>
         <Stack direction='row' gap={3}>
            <Box width={200} mb={3}>
               <ControllerSelect
                  label='Danh mục '
                  options={categories?.data || []}
                  _value='_id'
                  _title='category_name'
                  name='category'
                  control={control}
               />
            </Box>
            <Box width={200} mb={3}>
               <ControllerTextField placeholder='Tìm tên sản phẩm' name='search' control={control} />
            </Box>
         </Stack>
         <CoreTable
            columns={columns}
            data={dataProducts?.data}
            handleFetchData={getProduct}
            handleSetCurrentPage={setCurrentPage}
            pageSize={dataProducts?.pageSize}
            isPagination={true}
            loading={isFetching}
         />
      </BasicPage>
   );
}

export default ProductPage;
