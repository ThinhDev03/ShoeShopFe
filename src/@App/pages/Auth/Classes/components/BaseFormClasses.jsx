import React from 'react';
import PropTypes from 'prop-types';
// mui
import { Grid } from '@mui/material';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import ControllerSelect, { PropTypeSelect } from '@Core/Components/FormControl/ControllerSelect';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import FormGroup from '@Core/Components/FormControl/FormGroup';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { Box } from '@mui/system';
import CoreAutoComplete from '@Core/Components/Input/CoreAutoComplete';

export default function BaseFormClasses(props) {
   // TODO: remove hardcorded headTeacher list, once BE updated
   const { gradeList, form, onSubmit } = props;
   const { control, handleSubmit } = form;

   return (
      <Box component='form' sx={{ maxWidth: '700px' }} onSubmit={handleSubmit(onSubmit)}>
         <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
               <Grid container spacing={2} alignItems='center'>
                  <Grid item xs={6} sx={{ minHeight: '130px' }}>
                     <FormLabel required title='Khối' name='columns' gutterBottom />
                     <ControllerSelect options={gradeList} name='grade' control={control} />
                  </Grid>
                  <Grid item xs={6} sx={{ minHeight: '130px' }}>
                     <FormLabel required title='Tên lớp' name='columns' gutterBottom />
                     <ControllerTextField id='outlined-basic' name='className' control={control} />
                  </Grid>
               </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
               <FormGroup>
                  <FormLabel required title='Tên giáo viên chủ nhiệm' name='columns' gutterBottom />
               </FormGroup>
            </Grid>
         </Grid>
         <Grid sx={{ mt: 3 }}>
            <LoadingButton
               loading={false}
               loadingPosition='start'
               variant='contained'
               startIcon={<SaveIcon />}
               type='submit'>
               Thêm lớp
            </LoadingButton>
         </Grid>
      </Box>
   );
}

BaseFormClasses.propTypes = {
   gradeList: PropTypeSelect,
   form: PropTypes.object.isRequired,
   onSubmit: PropTypes.func.isRequired
};
