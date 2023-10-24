import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import ControllerTextarea from '@Core/Components/FormControl/ControllerTextarea';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import React from 'react';

function BaseFormBrand({ form, onSubmit, isLoading, title }) {
   const { control, handleSubmit } = form;

   return (
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
         <Grid container spacing={2}>
            <Grid item xs={6} sx={{ minHeight: '120px' }}>
               <FormLabel required title='Tên danh mục' name='brand_name' gutterBottom />
               <ControllerTextField name='brand_name' control={control} />
            </Grid>
            <Grid item xs={6} sx={{ minHeight: '120px' }}>
               <FormLabel required title='Nguồn gốc' name='origin' gutterBottom />
               <ControllerTextField name='origin' control={control} />
            </Grid>
            <Grid item xs={12} sx={{ minHeight: '120px' }}>
               <FormLabel title='Mô tả' name='description' gutterBottom />
               <ControllerTextarea name='description' control={control} />
            </Grid>
            <Grid item xs={12}>
               <LoadingButton loading={isLoading} variant='contained' startIcon={<SaveIcon />} type='submit'>
                  {title || 'Thêm mới'}
               </LoadingButton>
            </Grid>
         </Grid>
      </Box>
   );
}

export default BaseFormBrand;
