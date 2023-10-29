import React from 'react';
// mui
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import FormGroup from '@Core/Components/FormControl/FormGroup';
import SaveIcon from '@mui/icons-material/Save';
// import Hidden from '@mui/material';
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';

export default function BaseFormUser(props) {
   const { gender, form, onSubmit } = props;
   const { control, handleSubmit } = form;

   return (
      <Box component='form' sx={{ maxWidth: '700px' }} onSubmit={handleSubmit(onSubmit)}>
         <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
               <FormGroup>
                  <FormLabel required title='Địa chỉ Email' name='email' gutterBottom />
                  <ControllerTextField name='email' control={control} />
               </FormGroup>
            </Grid>
            <Grid item xs={12} md={6}>
               <FormGroup>
                  <FormLabel required title='Số điện thoại' name='phone' gutterBottom />
                  <ControllerTextField name='phone' control={control} />
               </FormGroup>
            </Grid>

            <Grid item xs={12} md={6}>
               <FormGroup>
                  <FormLabel required title='Tên hiển thị' name='displayName' gutterBottom />
                  <ControllerTextField name='displayName' control={control} />
               </FormGroup>
            </Grid>

            <Grid item xs={12} md={6}>
               <FormGroup>
                  <FormLabel required title='Ngày sinh' name='dateOfBirth' gutterBottom />
                  <ControllerTextField type='date' name='dateOfBirth' control={control} />
               </FormGroup>
            </Grid>

            <Grid item xs={12} md={6}>
               <FormGroup>
                  <FormLabel required title='Trình độ học vấn' name='eduBackground.qualification' gutterBottom />
                  <ControllerTextField name='eduBackground.qualification' control={control} />
               </FormGroup>
            </Grid>

            <Grid item xs={12} md={6}>
               <FormGroup>
                  <FormLabel
                     required
                     title='Tên trường đã tốt nghiệp'
                     name='eduBackground.universityName'
                     gutterBottom
                  />
                  <ControllerTextField name='eduBackground.universityName' control={control} />
               </FormGroup>
            </Grid>

            <Grid item xs={12} md={6}>
               <FormGroup>
                  <FormLabel required title='Thời gian tốt nghiệp' name='eduBackground.graduatedAt' gutterBottom />
                  <ControllerTextField type='date' name='eduBackground.graduatedAt' control={control} />
               </FormGroup>
            </Grid>
            <Grid item xs={12} md={6}>
               <FormGroup>
                  <FormLabel required title='Giới tính' name='gender' gutterBottom />
                  <ControllerSelect options={gender} name='gender' control={control} />
               </FormGroup>
            </Grid>
         </Grid>
         <Grid marginTop={2}>
            <Button variant='contained' startIcon={<SaveIcon />} type='submit'>
               Tạo tài khoản
            </Button>
         </Grid>
      </Box>
   );
}
