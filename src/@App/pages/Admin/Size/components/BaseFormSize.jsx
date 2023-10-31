import React from 'react';
import PropTypes from 'prop-types';
// mui
import { Grid } from '@mui/material';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { Box } from '@mui/system';
import ControllerTextarea from '@Core/Components/FormControl/ControllerTextarea';

export default function BaseFormSize(props) {
   const { form, onSubmit, isLoading, title } = props;
   const { control, handleSubmit } = form;

   return (
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
         <Grid container spacing={3}>
            <Grid item xs={6} sx={{ minHeight: '120px' }}>
               <FormLabel required title='Kích thước' name='size_name' gutterBottom />
               <ControllerTextField name='size_name' control={control} />
            </Grid>
            <Grid item xs={6} sx={{ minHeight: '120px' }}>
               <FormLabel title='Mô tả' name='description' gutterBottom required />
               <ControllerTextarea name='description' control={control} />
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
               <LoadingButton
                  loading={isLoading}
                  loadingPosition='start'
                  variant='contained'
                  startIcon={<SaveIcon />}
                  type='submit'>
                  {title || 'Thêm mới'}
               </LoadingButton>
            </Grid>
         </Grid>
      </Box>
   );
}
