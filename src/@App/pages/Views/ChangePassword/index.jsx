import useAuth from '@App/hooks/useAuth';
import authService from '@App/services/auth.service';
import ControllerTextFieldPassword from '@Core/Components/FormControl/ControllerTextFieldPassword';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaRegister = yup.object({
   password: yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu phải lớn hơn 6 ký tự').default(''),
   confirmPassword: yup
      .string()
      .trim()
      .required('Vui lòng nhập lại mật khẩu')
      .oneOf([yup.ref('password')], 'mật khẩu không trùng khớp')
      .default('')
});

const ChangePassword = () => {
   const { user } = useAuth();

   const { handleSubmit, reset, control } = useForm({
      resolver: yupResolver(schemaRegister),
      defaultValues: schemaRegister.getDefault()
   });

   const onSubmit = async (data) => {
      try {
         await authService.updateUser(user._id, { password: data.password });
         successMessage('Cập nhật thành công.');
         reset();
      } catch (error) {
         errorMessage('Cập nhật thất bại.');
      }
   };

   return (
      <Container maxWidth='lg' sx={{ py: 3 }}>
         <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant='h4' sx={{ my: 3 }}>
               Thay đổi mật khẩu đăng nhập
            </Typography>
            <Box component='form' width={500} onSubmit={handleSubmit(onSubmit)}>
               <Box sx={{ minHeight: 80 }}>
                  <FormLabel title='Mật khẩu mới' required />
                  <ControllerTextFieldPassword
                     fullWidth
                     name='password'
                     placeholder='Nhập mật khẩu mới'
                     control={control}
                  />
               </Box>
               <Box sx={{ minHeight: 80 }}>
                  <FormLabel title='Mật khẩu nhập lại' required />
                  <ControllerTextFieldPassword
                     fullWidth
                     name='confirmPassword'
                     placeholder='Nhập lại mật khẩu mới'
                     control={control}
                  />
               </Box>
               <Box>
                  <Button type='submit'>Cập nhật</Button>
               </Box>
            </Box>
         </Box>
      </Container>
   );
};

export default ChangePassword;
