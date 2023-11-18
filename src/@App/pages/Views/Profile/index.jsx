import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { schemaProfile } from './utils/yup.schema';
import EditIcon from '@mui/icons-material/Edit';

import useAuth from '@App/hooks/useAuth';
import BaseFormUpdateProfile from './components/BaseFormUpdateProfile';
import authService from '@App/services/auth.service';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import UploadImage from './components/UploadImage';

const Profile = () => {
   const { user, getUser } = useAuth();

   const [isUpdate, setIsUpdate] = useState(false);

   const { reset, ...form } = useForm({
      resolver: yupResolver(schemaProfile),
      defaultValues: user
   });

   const onSubmit = async (data) => {
      try {
         await authService.updateUser(user._id, data);
         getUser();
         successMessage('Cập nhật thành công.');
      } catch (error) {
         errorMessage('Cập nhật thất bại.');
      }
   };

   const handleClickSetupdate = () => {
      setIsUpdate((prev) => !prev);

      if (isUpdate) {
         reset(user);
      }
   };

   return (
      <Container maxWidth='lg'>
         <Box sx={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,.13)', px: '30px' }}>
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  borderBottom: '.0625rem solid #efefef'
               }}>
               <Box sx={{ py: 2 }}>
                  <Typography component='h2' variant='h6' sx={{ fontSize: '18px', fontWeight: 600 }}>
                     Hồ Sơ Của Tôi
                  </Typography>
                  <Box sx={{ mb: 0.5, fontSize: '.875rem', color: '#555' }}>
                     Quản lý thông tin hồ sơ để bảo mật tài khoản
                  </Box>
               </Box>
               <Box sx={{ py: 2 }}>
                  <Button onClick={handleClickSetupdate} startIcon={!isUpdate && <EditIcon />}>
                     {isUpdate ? 'Hủy' : 'Sửa thông tin'}
                  </Button>
               </Box>
            </Box>
            <Box sx={{ pt: '30px' }}>
               <Grid container sx={2}>
                  <Grid item xs={7}>
                     <BaseFormUpdateProfile form={form} isUpdate={isUpdate} onSubmit={onSubmit} />
                  </Grid>
                  <Grid item xs={5}>
                     <UploadImage />
                  </Grid>
               </Grid>
            </Box>
         </Box>
      </Container>
   );
};

export default Profile;
