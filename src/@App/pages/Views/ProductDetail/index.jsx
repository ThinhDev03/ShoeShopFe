import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import SwiperSlider from './components/SwiperSlider';
import ProductDescription from './components/ProductDescription';
import RelatedProducts from './components/RelatedProducts';
import productService from '@App/services/product.service';
import productDetailService from '@App/services/product-detail.service';
import { useQueries } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import CommentItem from './components/CommentItem';
import commentService from '@App/services/commnet.service';
import useAuth from '@App/hooks/useAuth';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CoreRating from '@Core/Components/Input/CoreRating';
function ProductDetail() {
   const { id } = useParams();
   const { isAuththentication, user } = useAuth();
   const { control, handleSubmit, reset, setError } = useForm({
      resolver: yupResolver(
         yup.object().shape({
            description: yup.string().required('Vui lòng nhập bình luận'),
            rate: yup.string().required('Vui lòng chọn số sao')
         })
      )
   });
   const [{ data: product }, { data: details }, { data: comments, refetch: refetchComment }] = useQueries({
      queries: [
         {
            queryKey: 'products',
            queryFn: async () => {
               const res = await productService.getOne(id);
               return res.data;
            }
         },
         {
            queryKey: 'product-detail',
            queryFn: async () => {
               const res = await productDetailService.getOne(id);
               return res.data;
            }
         },
         {
            queryKey: 'comment',
            queryFn: async () => {
               const res = await commentService.find(id);
               return res.data;
            }
         }
      ]
   });

   const getUniqueProductWithColor = (productOrigin) => {
      if (!productOrigin) return [];
      const newSet = new Map();
      productOrigin.forEach((item) => {
         newSet.set(item.color_id._id, item);
      });
      const products = Array.from(newSet);
      const flatProduct = products.map(([_, p]) => p);
      return flatProduct;
   };
   const productDetails = getUniqueProductWithColor(details);

   const onSubmit = async (data) => {
      await commentService.createComment({ ...data, user_id: user._id, product_id: id });
      await refetchComment();
      reset({ description: '' });
   };

   return (
      <>
         {product ? (
            <Container maxWidth='lg' sx={{ py: 3 }}>
               <Grid container spacing={2} mt={3}>
                  <Grid item xs={12} md={7}>
                     <SwiperSlider productDetails={productDetails} />
                  </Grid>
                  <Grid item md={5}>
                     <ProductDescription product={product} productDetails={productDetails} details={details} />
                  </Grid>
               </Grid>
               <Box sx={{ borderTop: '1px dashed #333', my: 5 }}></Box>
               <Box p={3}>
                  {comments &&
                     comments.map((comment) => {
                        return <CommentItem {...comment} />;
                     })}
                  {isAuththentication && (
                     <form onSubmit={handleSubmit(onSubmit)}>
                        <Box mt={4} mb={1}>
                           <CoreRating control={control} name='rate' />
                           <ControllerTextField
                              control={control}
                              name='description'
                              id='outlined-multiline-static'
                              label='Bình luận'
                              multiline
                              rows={4}
                              variant='outlined'
                           />
                        </Box>
                        <Button type='submit'>Bình luận</Button>
                     </form>
                  )}
                  <Box sx={{ borderTop: '1px dashed #333', my: 5 }}></Box>
               </Box>
               <RelatedProducts />
            </Container>
         ) : (
            <Typography variant='h3' sx={{ mt: 5, color: '#555555', textAlign: 'center' }}>
               Sản phẩm không tồn tại!!!
            </Typography>
         )}
      </>
   );
}

export default ProductDetail;
