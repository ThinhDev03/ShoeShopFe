import React from 'react';
import PropTypes from 'prop-types';
// mui
import { Grid } from '@mui/material';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import { PropTypeSelect } from '@Core/Components/FormControl/ControllerSelect';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { Box } from '@mui/system';

export default function BaseFormClasses(props) {
   // TODO: remove hardcorded headTeacher list, once BE updated
   const { gradeList, form, onSubmit } = props;
   const { control, handleSubmit, setValue } = form;

   return (
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
         <Grid container spacing={3}>
            <Grid item xs={6} sx={{ minHeight: '120px' }}>
               <FormLabel required title='Tên màu' name='color_name' gutterBottom />
               <ControllerTextField name='color_name' control={control} />
            </Grid>
            <Grid item xs={6} sx={{ minHeight: '120px' }}>
               <FormLabel title='Mô tả' name='description' gutterBottom />
               <ControllerTextField name='description' control={control} />
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
               <LoadingButton
                  loading={false}
                  loadingPosition='start'
                  variant='contained'
                  startIcon={<SaveIcon />}
                  type='submit'>
                  Thêm lớp
               </LoadingButton>
            </Grid>
         </Grid>
      </Box>
   );
}

BaseFormClasses.propTypes = {
   gradeList: PropTypeSelect,
   form: PropTypes.object.isRequired,
   onSubmit: PropTypes.func.isRequired
};
