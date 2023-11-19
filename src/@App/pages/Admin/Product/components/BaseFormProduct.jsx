import React from 'react';
import { Box, Grid } from '@mui/material';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import categoryService from '@App/services/category.service';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import brandService from '@App/services/brand.service';
import UploadThumbnail from './UploadThumbnail';
import ControllerEditor from '@Core/Components/FormControl/ControllerEditor';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import productService from '@App/services/product.service';

function BaseFormProduct(props) {
   const { form, title, product_id, setSearchParams, setIsChangeImages } = props;

   const { handleSubmit, control, setValue, getValues } = form;

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

   useQuery(
      ['getProduct', { product_id }],
      async () => {
         if (product_id) {
            const res = await productService.getOne(product_id);
            return res.data;
         }
         return true;
      },
      {
         onSuccess(data) {
            if (product_id) {
               setValue('name', data.name);
               setValue('category_id', data.category_id._id);
               setValue('brand_id', data.brand_id._id);
               setValue('description', data.description);
               setValue('thumbnail', data.thumbnail);
            }
         }
      }
   );

   const { isLoading: createLoading, mutate: createProduct } = useMutation({
      mutationFn: async (data) => {
         console.log(data);
         return await productService.createProduct(data);
      },
      onSuccess: (data) => {
         successMessage(data.message);
         setSearchParams({ id: data?.data?._id });
      },
      onError: (error) => {
         errorMessage(error);
      }
   });

   const { isLoading: updateLoading, mutate: updateProduct } = useMutation({
      mutationFn: async (data) => {
         return await productService.update(data, product_id, 'post');
      },
      onSuccess: (data) => {
         successMessage(data.message);
      },
      onError: (error) => {
         errorMessage(error);
      }
   });

   const onSubmit = async (data) => {
      console.log(data);
      product_id ? updateProduct(data) : createProduct(data);
   };

   return (
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
         <Grid container spacing={2}>
            <Grid item xs={6}>
               <FormLabel required title='Tên sản phẩm' name='name' gutterBottom />
               <ControllerTextField name='name' control={control} />
            </Grid>
            <Grid item xs={3}>
               <FormLabel required title='Danh mục sản phẩm' name='category_id' gutterBottom />
               <ControllerSelect
                  name='category_id'
                  options={categories?.data}
                  _value='_id'
                  _title='category_name'
                  control={control}
               />
            </Grid>
            <Grid item xs={3}>
               <FormLabel required title='Thương hiệu' name='brand_id' gutterBottom />
               <ControllerSelect
                  name='brand_id'
                  options={brands?.data}
                  _value='_id'
                  _title='brand_name'
                  control={control}
               />
            </Grid>
            <Grid item xs={2}>
               <FormLabel required title='Ảnh đại diện' name='thumbnail' gutterBottom />
               <UploadThumbnail product_id={product_id} name='thumbnail' control={control} multiple={false} />
            </Grid>
            <Grid item xs={10}>
               <FormLabel required title='Ảnh khác' name='images' gutterBottom />
               <UploadThumbnail
                  getValues={getValues}
                  name='images'
                  control={control}
                  multiple
                  setValue={setValue}
                  product_id={product_id}
                  setIsChangeImages={setIsChangeImages}
               />
            </Grid>
            <Grid item xs={12}>
               <FormLabel title='Mô tả sản phẩm' name='description' gutterBottom />
               <ControllerEditor name='description' control={control} multiple={true} />
            </Grid>
            <Grid item xs={12}>
               <LoadingButton
                  loading={createLoading || updateLoading}
                  loadingPosition='start'
                  variant='contained'
                  startIcon={<SaveIcon />}
                  type='submit'
                  sx={{ mt: 4 }}>
                  {title || 'Lưu sản phẩm'}
               </LoadingButton>
            </Grid>
         </Grid>
      </Box>
   );
}

export default BaseFormProduct;
