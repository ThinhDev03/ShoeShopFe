import React from 'react';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import { Box, Button, FormControlLabel, Grid, Radio, RadioGroup, styled } from '@mui/material';
import useAuth from '@App/hooks/useAuth';
import CoreRadioGroup from '@Core/Components/Input/CoreRadioGroup';
import { gender } from '@App/pages/Admin/User/utils';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';

const BaseFormUpdateProfile = ({ form, ...props }) => {
   const { handleSubmit, control } = form;
   const { isUpdate, onSubmit } = props;

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <Grid container sx={2}>
            <Grid item xs={3}>
               <LabelTileProfileInfo>Tên đăng nhập:</LabelTileProfileInfo>
            </Grid>
            <Grid item xs={8} sx={{ minHeight: '80px' }}>
               <ControllerTextField
                  fullWidth
                  name='username'
                  placeholder='Tên đăng nhập'
                  control={control}
                  disabled={!isUpdate}
               />
            </Grid>
         </Grid>
         <Grid container sx={2}>
            <Grid item xs={3}>
               <LabelTileProfileInfo>Tên người dùng:</LabelTileProfileInfo>
            </Grid>
            <Grid item xs={8} sx={{ minHeight: '80px' }}>
               <ControllerTextField
                  fullWidth
                  name='fullname'
                  placeholder='Tên người dùng'
                  control={control}
                  disabled={!isUpdate}
               />
            </Grid>
         </Grid>
         <Grid container sx={2}>
            <Grid item xs={3}>
               <LabelTileProfileInfo>Số điện thoại:</LabelTileProfileInfo>
            </Grid>
            <Grid item xs={8} sx={{ minHeight: '80px' }}>
               <ControllerTextField
                  fullWidth
                  name='phone'
                  placeholder='Số điện thoại'
                  control={control}
                  disabled={!isUpdate}
               />
            </Grid>
         </Grid>
         <Grid container sx={2}>
            <Grid item xs={3}>
               <LabelTileProfileInfo>Địa chỉ Email:</LabelTileProfileInfo>
            </Grid>
            <Grid item xs={8} sx={{ minHeight: '80px' }}>
               <ControllerTextField fullWidth name='email' placeholder='Email' control={control} disabled={!isUpdate} />
            </Grid>
         </Grid>
         <Grid container sx={2}>
            <Grid item xs={3}>
               <LabelTileProfileInfo sx={{ mb: 0 }}>Giới tính:</LabelTileProfileInfo>
            </Grid>
            <Grid item xs={8} sx={{ minHeight: '80px' }}>
               <ControllerSelect options={gender} name='gender' control={control} disabled={!isUpdate} />
            </Grid>
         </Grid>
         <Grid container sx={2}>
            <Grid item xs={3}>
               <LabelTileProfileInfo>Địa chỉ:</LabelTileProfileInfo>
            </Grid>
            <Grid item xs={8} sx={{ minHeight: '80px' }}>
               <ControllerTextField
                  fullWidth
                  name='address'
                  placeholder='Địa chỉ'
                  control={control}
                  disabled={!isUpdate}
               />
            </Grid>
         </Grid>
         {isUpdate && (
            <Grid item xs={12}>
               <Box sx={{ my: '30px' }}>
                  <Button type='submit'>Lưu</Button>
               </Box>
            </Grid>
         )}
      </form>
   );
};

const LabelTileProfileInfo = styled('div')({
   color: '#555555cc',
   marginBottom: '30px'
});

export default BaseFormUpdateProfile;
