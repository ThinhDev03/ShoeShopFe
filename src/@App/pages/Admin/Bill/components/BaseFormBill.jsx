import React from 'react';
// mui
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import FormGroup from '@Core/Components/FormControl/FormGroup';
import SaveIcon from '@mui/icons-material/Save';
// import Hidden from '@mui/material';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';
import toFormatMoney from '@Core/Helper/Price';
import { paymentMethodOptions, paymentStatusOptions } from '../utils';
import useAuth from '@App/hooks/useAuth';

export default function BaseFormBill(props) {
   const { billStatus, billDetail, form, onSubmit } = props;
   const { control, handleSubmit, watch } = form;
   const { userPermission } = useAuth();

   const payment_status = watch('payment_status');

   return (
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
         <Grid container gap={3}>
            <Grid container spacing={3} height='fit-content' md={7}>
               <Grid item xs={12} md={6}>
                  <FormGroup>
                     <FormLabel required title='Người nhận' name='receiver' gutterBottom />
                     <ControllerTextField name='receiver' control={control} disabled />
                  </FormGroup>
               </Grid>

               <Grid item xs={12} md={6}>
                  <FormGroup>
                     <FormLabel required title='Số điện thoại' name='phone_number' gutterBottom />
                     <ControllerTextField name='phone_number' control={control} disabled />
                  </FormGroup>
               </Grid>

               <Grid item xs={12} md={6}>
                  <FormGroup>
                     <FormLabel required title='Ghi chú' name='note' gutterBottom />
                     <ControllerTextField name='note' control={control} disabled />
                  </FormGroup>
               </Grid>

               <Grid item xs={12} md={6}>
                  <FormGroup>
                     <FormLabel required title='Người đặt' name='user_order' gutterBottom />
                     <ControllerTextField name='user_order' control={control} disabled />
                  </FormGroup>
               </Grid>

               <Grid item xs={12} md={6}>
                  <FormGroup>
                     <FormLabel required title='Địa chỉ' name='address' gutterBottom />
                     <ControllerTextField name='address' control={control} disabled />
                  </FormGroup>
               </Grid>

               <Grid item xs={12} md={6}>
                  <FormGroup>
                     <FormLabel required title='Tổng thanh toán' name='total_money' gutterBottom />
                     <ControllerTextField name='total_money' control={control} disabled />
                  </FormGroup>
               </Grid>

               <Grid item xs={12} md={6}>
                  <FormGroup>
                     <FormLabel required title='Phương thức thanh toán' name='payment_method' gutterBottom />
                     <ControllerSelect
                        name='payment_method'
                        options={paymentMethodOptions}
                        control={control}
                        disabled
                     />
                  </FormGroup>
               </Grid>

               <Grid item xs={12} md={6}>
                  <FormGroup>
                     <FormLabel required title='Trạng thái thanh toán' name='payment_status' gutterBottom />
                     <ControllerSelect name='payment_status' options={paymentStatusOptions} control={control} />
                  </FormGroup>
               </Grid>

               <Grid item xs={12} md={6}>
                  <FormGroup>
                     <FormLabel required title='Trạng thái' name='status' gutterBottom />
                     <ControllerSelect name='status' options={billStatus} control={control} />
                  </FormGroup>
               </Grid>

               {/* {payment_status === billStatus[3] ||
                  (payment_status === billStatus[4] && (
                     <Grid marginTop={3} marginLeft={3} item md={12}>
                        <Button variant='contained' color='secondary' startIcon={<SaveIcon />} type='submit'>
                           Lưu đơn hàng
                        </Button>
                     </Grid>
                  ))} */}

               <Grid marginTop={3} marginLeft={3} item md={12}>
                  <Button variant='contained' color='secondary' startIcon={<SaveIcon />} type='submit'>
                     Lưu đơn hàng
                  </Button>
               </Grid>
            </Grid>
            <Grid md={5}>
               <Typography variant='h5' mb={1}>
                  Danh sách sản phẩm
               </Typography>
               <Stack direction='row' sx={{ borderBottom: '1px solid #ccc', pb: 1, mb: 1 }} gap={3}>
                  <Box flex={1}>Hình ảnh</Box>
                  <Box flex={1}>Số lượng</Box>
                  <Box flex={1}>Tên</Box>
                  <Box flex={1}>Size</Box>
                  <Box flex={1}>Màu</Box>
                  <Box flex={1}>Giá</Box>
               </Stack>
               {billDetail.map((product) => {
                  return (
                     <Stack
                        direction='row'
                        sx={{ borderBottom: '1px solid #ccc', pb: 1, mb: 1, gap: 3 }}
                        alignItems='center'>
                        <Box flex={1} height='60px'>
                           <LazyLoadingImage src={product.image} />
                        </Box>
                        <Typography flex={1}>x{product.quantity}</Typography>
                        <Typography flex={1}>{product.product_name}</Typography>
                        <Typography flex={1}>{product.size}</Typography>
                        <Typography flex={1}>{product.color}</Typography>
                        <Typography flex={1}>{toFormatMoney(product.price)}</Typography>
                     </Stack>
                  );
               })}
            </Grid>
         </Grid>
      </Box>
   );
}
