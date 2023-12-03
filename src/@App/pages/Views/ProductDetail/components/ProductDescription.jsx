import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Chip, Stack, Typography, styled } from '@mui/material';

import toFormatMoney, { toDiscountedPrice } from '@Core/Helper/Price';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import ColorButton from './ColorButton';
import AccordionDescription from './AccordionDescription';
import cartService from '@App/services/cart.service';
import useAuth from '@App/hooks/useAuth';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import * as yup from 'yup';
import ControllerInputNumber from '@Core/Components/FormControl/ControllerInputNumber';

export const MAX_QUANTITY = 5;

function ProductDescription({ productDetails, details, product }) {
   const [quantity, setQuantity] = useState(0);
   const [loading, setLoading] = useState(false);
   const yupCart = yup.object().shape({
      product_id: yup.string().strict(true).required('Vui lòng chọn size').default(''),
      quantity: yup
         .number()
         .strict(true)
         .test('max_quantity', (value, ctx) => {
            if (Number(value) <= 0) {
               return ctx.createError({ message: 'Vui lòng chọn lại số lượng.' });
            }

            if (Number(value) > MAX_QUANTITY) {
               return ctx.createError({ message: 'Số lượng sản phẩm vượt quá giới hạn cho phép' });
            }

            if (Number(value) > quantity) {
               return ctx.createError({ message: 'Vượt quá số lượng sản phẩm trong kho' });
            }

            return true;
         })
   });
   const { user, isAuththentication } = useAuth();
   const [colorSelected, setColorSelected] = useState(null);

   const {
      control,
      handleSubmit,
      watch,
      formState: errors,
      setError
   } = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupCart),
      defaultValues: yupCart.getDefault()
   });

   const onSubmit = async (data) => {
      if (!isAuththentication) return errorMessage('Vui lòng đăng nhập');
      try {
         setLoading(true);
         await cartService.create({
            user_id: user._id,
            ...data,
            quantity: Number(data.quantity)
         });
         successMessage('Thêm vào giỏ hàng thành công');
      } catch (error) {
         if (error.response.status === 400) {
            setError('quantity', { message: 'Sản phẩm trong giỏ hàng đã đạt quá giới hạn cho phép.' });
         }
      } finally {
         setLoading(false);
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
   const currentProduct = useMemo(() => {
      return details ? details.find((product) => product._id === currentProductId) || details[0] : {};
   }, [currentProductId]);
   const sizes = getSizeWithColor(details, colorSelected);
   const hasQuantity = currentProduct && currentProduct.quantity === 0;

   useEffect(() => {
      setQuantity(currentProduct?.quantity);
   }, [currentProductId, product]);

   return (
      <React.Fragment>
         <Stack sx={{ padding: '0 24px', gap: '18px' }}>
            <Box sx={{ fontWeight: 500 }}>
               <Box sx={{ lineHeight: '1.2', fontWeight: 600, fontSize: '24px', mb: 1 }}>{product?.name}</Box>
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 3 }}>
                     <Box sx={{ fontSize: '18px', color: '#707072', mb: 1 }}>{product?.category_id?.category_name}</Box>
                     <Box sx={{ fontSize: '18px', color: '#707072', mb: 1 }}>{product?.brand_id?.brand_name}</Box>
                  </Box>
                  {currentProduct?.quantity <= 0 ? (
                     <Chip variant='outlined' color='primary' label='Hết hàng' />
                  ) : (
                     <Chip color='secondary' variant='outlined' label='Còn hàng' />
                  )}
               </Box>
            </Box>
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
            {currentProductId ? (
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography
                     variant='h5'
                     sx={({ palette }) => ({ color: palette.education.text.main, fontWeight: 600 })}>
                     {details && toFormatMoney(toDiscountedPrice(currentProduct?.price, currentProduct?.sale))}
                  </Typography>
                  <Typography
                     variant='h5'
                     sx={{
                        color: '#808080',
                        textDecoration: 'line-through',
                        fontSize: '18px !important',
                        fontWeight: 500
                     }}>
                     {details && toFormatMoney(currentProduct?.price)}
                  </Typography>
               </Box>
            ) : (
               <Typography
                  variant='h5'
                  sx={({ palette }) => ({
                     color: palette.education.text.main,
                     fontWeight: 600
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
                     <ControllerInputNumber
                        disabled={!colorSelected || hasQuantity}
                        name='quantity'
                        control={control}
                     />
                  </Box>
               </Stack>
               <Stack gap={1}>
                  <Button
                     type='submit'
                     fullWidth
                     disabled={hasQuantity || loading}
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

export default ProductDescription;
