import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import React from 'react';
import SaveIcon from '@mui/icons-material/Save';
import FormLabel from '@Core/Components/FormControl/FormLabel';


function BaseFormVoucher(props) {
   const { form, onSubmit } = props;
   const { control, handleSubmit } = form;
   return (
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
         <Grid container spacing={3}>
            <Grid item xs={6}>
               <FormLabel required title='Tên voucher' name='voucher_name' gutterBottom />
               <ControllerTextField name='voucher_name' control={control} />
            </Grid>
            <Grid item xs={6}>
               <FormLabel required title='Giảm giá cho đơn hàng từ (VND)' name='point_discount' gutterBottom />
               <ControllerTextField name='point_discount' control={control} />
            </Grid>
            <Grid item xs={6}>
               <FormLabel required title='Số tiền giảm (VND)' name='discount' gutterBottom />
               <ControllerTextField name='discount' control={control} />
            </Grid>
            <Grid item xs={12}>
               <LoadingButton
                  loading={false}
                  loadingPosition='start'
                  variant='contained'
                  startIcon={<SaveIcon />}
                  type='submit'>
                  {props.title || 'Thêm mới'}
               </LoadingButton>
            </Grid>
         </Grid>
      </Box>
   );
}

export default BaseFormVoucher;
