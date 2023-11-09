import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, Typography, styled } from '@mui/material';

import yupCart from '../utils/yup.card';
import toFormatMoney, { toDiscountedPrice } from '@Core/Helper/Price';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import ColorButton from './ColorButton';
import AccordionDescription from './AccordionDescription';
import cartService from '@App/services/cart.service';
import useAuth from '@App/hooks/useAuth';
import { errorMessage, successMessage } from '@Core/Helper/Message';

function ProductDescription({ productDetails, details, product }) {
   console.log(product);
   const { user, isAuthenticated } = useAuth();
   const [colorSelected, setColorSelected] = useState(null);
   const { control, handleSubmit, watch } = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupCart),
      defaultValues: yupCart.getDefault()
   });
   const onSubmit = async (data) => {
      try {
         await cartService.create({
            user_id: user._id,
            ...data
         });
         successMessage('Thêm vào giỏ hàng thành công');
      } catch (error) {
         if (!isAuthenticated) {
            return errorMessage('Vui lòng đăng nhập');
         }
         errorMessage('Thêm sản phẩm vào giỏ thất bại');
      }
   };

   const getSizeWithColor = (products, color) => {
      if (!products) return [];
      const productWithColor = products.filter((product) => product.color_id._id === color);
      return productWithColor.map(({ size_id, _id }) => ({
         size_name: size_id.size_name,
         product_id: _id
      }));
   };

   const currentProductId = watch('product_id');
   const currentProduct = details ? details.find((product) => product._id === currentProductId) || details[0] : {};
   const sizes = getSizeWithColor(details, colorSelected);
   const hasQuantity = currentProduct && currentProduct.quantity === 0;
   return (
      <React.Fragment>
         <Stack sx={{ padding: '0 24px', gap: '18px' }}>
            <Typography variant='h5'>{product?.name}</Typography>
            {/* <Stack flexDirection='row' justifyContent='space-between'>
               <Box sx={{ display: 'flex', gap: 2, fontSize: '18px' }}>
                  Mã sản phẩm:
                  <strong>AV00180</strong>
               </Box>
               <Box sx={{ display: 'flex', gap: 2, fontSize: '18px' }}>
                  Tình trạng:
                  <strong>{}</strong>
               </Box>
            </Stack> */}
            {colorSelected ? (
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography
                     variant='h5'
                     sx={({ palette }) => ({ color: palette.education.text.main, fontWeight: 600 })}>
                     {details && toFormatMoney(toDiscountedPrice(currentProduct?.price, currentProduct?.sale))}
                  </Typography>
                  <Typography
                     sx={{ color: '#808080', fontSize: '20px', textDecoration: 'line-through', fontWeight: 500 }}>
                     {details && toFormatMoney(currentProduct?.price)}
                  </Typography>
               </Box>
            ) : (
               <Typography
                  variant='h5'
                  sx={({ palette }) => ({
                     color: palette.education.text.main,
                     fontWeight: 600,
                     bgcolor: '#fafafa',
                     padding: '15px 20px'
                  })}>
                  {product?.toPrice === product?.fromPrice ? (
                     toFormatMoney(product?.toPrice)
                  ) : (
                     <React.Fragment>
                        <span>{toFormatMoney(product?.toPrice)}</span>
                        <span style={{ margin: '0px 8px' }}>-</span>
                        <span>{toFormatMoney(product?.fromPrice)}</span>
                     </React.Fragment>
                  )}
               </Typography>
            )}

            <Divider />

            <Box component='form' onSubmit={handleSubmit(onSubmit)}>
               <Typography sx={{ textTransform: 'uppercase', fontWeight: 600, mb: 2 }}>Color:</Typography>
               <Stack gap={3} flexDirection='row' alignItems='center'>
                  {productDetails.map((product, index) => {
                     return (
                        <ColorButton
                           key={product._id}
                           setColorSelected={setColorSelected}
                           color={product.color_id}
                           colorSelected={colorSelected}
                        />
                     );
                  })}
               </Stack>

               <Divider />

               <Stack flexDirection='row' alignItems='center' gap={2} mb={1}>
                  <Box sx={{ width: '50%', minHeight: '100px' }}>
                     <Typography sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Size</Typography>
                     <ControllerSelect
                        disabled={!colorSelected}
                        options={sizes}
                        _value='product_id'
                        _title='size_name'
                        name='product_id'
                        control={control}
                        size='small'
                     />
                  </Box>
                  <Box sx={{ width: '50%', minHeight: '100px' }}>
                     <Typography sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Số lượng</Typography>
                     <ControllerTextField type='number' disabled={!colorSelected} name='quantity' control={control} />
                  </Box>
               </Stack>
               <Stack gap={1}>
                  <Button
                     type='submit'
                     fullWidth
                     disabled={hasQuantity}
                     sx={({ palette }) => ({
                        textTransform: 'uppercase',
                        py: '18px',
                        bgcolor: palette.education.text.black,
                        ':hover': {
                           bgcolor: palette.education.text.black
                        }
                     })}>
                     {hasQuantity ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
                  </Button>
               </Stack>
            </Box>

            <AccordionDescription product={product} />
         </Stack>
      </React.Fragment>
   );
}

const Divider = styled(Box)(({ theme }) => ({
   margin: '12px 0px 15px 0',
   backgroundColor: theme.palette.education.text.white,
   background: 'url(https://ananas.vn/wp-content/themes/ananas/fe-assets/images/bg_divider.png) repeat-x 7px',
   height: '2px'
}));

export default React.memo(ProductDescription);
