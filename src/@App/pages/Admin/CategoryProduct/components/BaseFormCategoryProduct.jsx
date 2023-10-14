import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import React from 'react';

function BaseFormCategoryProduct(props) {
   const { control, handleSubmit } = props.form;

   const onSubmit = (data) => {
      console.log(data);
   };

   return (
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
         <Grid container spacing={2}>
            <Grid item xs={6} sx={{ minHeight: '130px' }}>
               <FormLabel required title='Tên danh mục' name='category_name' gutterBottom />
               <ControllerTextField name='category_name' control={control} />
            </Grid>
            <Grid item xs={6} sx={{ minHeight: '130px' }}>
               <FormLabel title='Mô tả' name='description' gutterBottom />
               <ControllerTextField name='description' control={control} />
            </Grid>
            <Grid item>
               <LoadingButton loading={false} variant='contained' startIcon={<SaveIcon />} type='submit'>
                  Thêm mới
               </LoadingButton>
            </Grid>
         </Grid>
      </Box>
   );
}

export default BaseFormCategoryProduct;
