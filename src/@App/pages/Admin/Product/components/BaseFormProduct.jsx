import React from 'react';
import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useQueries } from '@tanstack/react-query';

import brandService from '@App/services/brand.service';
import ControllerInputFile from './ControllerInputFile';
import categoryService from '@App/services/category.service';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import ControllerUploadMultipleImage from './ControllerUploadMultipleImage';
import ControllerEditor from '@Core/Components/FormControl/ControllerEditor';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';

function BaseFormProduct(props) {
   const { form, onSubmit, loading, title, product_id } = props;
   const { control, handleSubmit, setValue, getValue } = form;

   const results = useQueries({
      queries: [
         {
            queryKey: ['category'],
            queryFn: async () => {
               const rest = await categoryService.getAll();
               return rest.data;
            }
         },
         {
            queryKey: ['brand'],
            queryFn: async () => {
               const rest = await brandService.getAll();
               return rest.data;
            }
         }
      ]
   });

   return (
      <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
         <Grid container spacing={2}>
            <Grid item xs={12} md={4} sx={{ minHeight: '105px' }}>
               <FormLabel required title='Tên sản phẩm' name='name' gutterBottom />
               <ControllerTextField name='name' control={control} />
            </Grid>
            <Grid item xs={12} md={4} sx={{ minHeight: '105px' }}>
               <FormLabel required title='Danh mục' name='category_id' gutterBottom />
               <ControllerSelect
                  name='category_id'
                  options={results[0]?.data}
                  _title='category_name'
                  _value='_id'
                  control={control}
               />
            </Grid>
            <Grid item xs={12} md={4} sx={{ minHeight: '105px' }}>
               <FormLabel required title='Thương hiệu' name='brand_id' gutterBottom />
               <ControllerSelect
                  name='brand_id'
                  options={results[1]?.data}
                  _title='brand_name'
                  _value='_id'
                  control={control}
               />
            </Grid>
            <Grid item xs={2} sx={{ maxHeight: 200 }}>
               <FormLabel required title='Ảnh đại diện sản phẩm' name='thumbnail' gutterBottom />
               <ControllerInputFile name='thumbnail' setValue={setValue} control={control} multiple={true} />
            </Grid>

            <Grid item xs={12} md={10} sx={{ mb: 3 }}>
               <FormLabel required title='Ảnh sản phẩm' name='images' gutterBottom />
               <ControllerUploadMultipleImage name='images' setValue={setValue} control={control} />
            </Grid>

            <Grid item xs={12}>
               <FormLabel title='Mô tả sản phẩm' name='description' gutterBottom />
               <ControllerEditor minRows={8} name='description' setValue={setValue} control={control} />
            </Grid>
         </Grid>
         <LoadingButton
            loading={loading}
            loadingPosition='start'
            variant='contained'
            startIcon={<SaveIcon />}
            type='submit'
            sx={{ mt: 4 }}>
            {title || 'Thêm mới'}
         </LoadingButton>
      </form>
   );
}

export default BaseFormProduct;
