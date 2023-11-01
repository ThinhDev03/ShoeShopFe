import { Box, Breadcrumbs, Container, Grid, Link, Typography } from '@mui/material';
import React, { useState } from 'react';
import SwiperSlider from './components/SwiperSlider';
import ProductDescription from './components/ProductDescription';
import RelatedProducts from './components/RelatedProducts';
import productService from '@App/services/product.service';
import productDetailService from '@App/services/product-detail.service';
import { useQueries } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function ProductDetail() {
   const { id } = useParams();
   const [{ data: product }, { data: details }] = useQueries({
      queries: [
         {
            queryKey: 'products',
            queryFn: async () => {
               const rest = await productService.getOne(id);
               return rest.data;
            }
         },
         {
            queryKey: 'product-detail',
            queryFn: async () => {
               const rest = await productDetailService.getOne(id);
               return rest.data;
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
   return (
      <Container maxWidth='lg' sx={{ py: 3 }}>
         <Box sx={{ borderBottom: '3.5px solid #000', pb: 0.5 }}>
            <Breadcrumbs aria-label='breadcrumb'>
               <Link underline='hover' color='inherit' href='/'>
                  Sản phẩm
               </Link>
               <Link underline='hover' color='inherit' href='/material-ui/getting-started/installation/'>
                  ???
               </Link>
               <Typography color='text.primary' sx={{ fontWeight: 500 }}>
                  ???
               </Typography>
            </Breadcrumbs>
         </Box>
         <Grid container spacing={2} mt={3}>
            <Grid item xs={12} md={7}>
               <SwiperSlider productDetails={productDetails} />
            </Grid>
            <Grid item md={5}>
               <ProductDescription product={product} productDetails={productDetails} details={details} />
            </Grid>
         </Grid>
         <Box sx={{ borderTop: '1px dashed #333', my: 5 }}></Box>
         <RelatedProducts />
      </Container>
   );
}

export default ProductDetail;
