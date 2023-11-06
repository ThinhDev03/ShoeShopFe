import categoryService from '@App/services/category.service';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import { successMessage } from '@Core/Helper/Message';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';

function BaseFormCategory(props) {
   const { control, handleSubmit, reset } = props.form;

   return (
      <Box component='form' onSubmit={handleSubmit(props.onSubmit)}>
         <Grid container spacing={2}>
            <Grid item xs={6} sx={{ minHeight: '130px' }}>
               <FormLabel required title='Tên danh mục' name='category_name' gutterBottom />
               <ControllerTextField name='category_name' control={control} />
            </Grid>
            <Grid item xs={6} sx={{ minHeight: '130px' }}>
               <FormLabel title='Mô tả' name='description ' gutterBottom />
               <ControllerTextField name='description ' control={control} />
            </Grid>
            <Grid item>
               <LoadingButton loading={props.isLoading} variant='contained' startIcon={<SaveIcon />} type='submit'>
                  {props.title || 'Thêm mới'}
               </LoadingButton>
            </Grid>
         </Grid>
      </Box>
   );
}

export default BaseFormCategory;
