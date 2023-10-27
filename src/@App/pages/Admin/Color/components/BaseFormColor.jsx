import React from 'react';
import PropTypes from 'prop-types';
// mui
import { Grid } from '@mui/material';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import FormGroup from '@Core/Components/FormControl/FormGroup';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { Box } from '@mui/system';
import ControllerColor from './ControllerColor';
import ControllerTextarea from '@Core/Components/FormControl/ControllerTextarea';

export default function BaseFormColor(props) {
   const { form, onSubmit } = props;
   const { control, handleSubmit, setValue } = form;

   return (
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
         <Grid container spacing={3}>
            <Grid item xs={6} sx={{ minHeight: '120px' }}>
               <FormLabel required title='Tên màu' name='color_name' gutterBottom />
               <ControllerTextField name='color_name' control={control} />
            </Grid>
            <Grid item xs={6} sx={{ minHeight: '120px' }}>
               <FormLabel required title='Mã màu' name='color_code' gutterBottom />
               <ControllerColor name='color_code' setValue={setValue} control={control} />
            </Grid>
            <Grid item xs={12} sx={{ minHeight: '120px' }}>
               <FormLabel title='Mô tả' name='description' gutterBottom />
               <ControllerTextarea name='description' control={control} />
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
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

BaseFormColor.propTypes = {
   form: PropTypes.object.isRequired,
   onSubmit: PropTypes.func.isRequired,
   isLoading: PropTypes.bool
};
