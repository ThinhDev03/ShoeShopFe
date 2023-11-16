import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

import React from 'react';

import 'swiper/css';
import 'swiper/css/pagination';

import '../SwiperSlider/style.css';
import ProductCard from '@App/components/customs/common/ProductCard';
import { useQuery } from '@tanstack/react-query';
import productService from '@App/services/product.service';

function RelatedProducts() {
   const { data } = useQuery(
      ['relateProducts'],
      async () => {
         const rest = await productService.getAll();
         return rest.data;
      },
      {
         initialData: []
      }
   );
   return (
      <React.Fragment>
         <Typography variant='h5' sx={{ textAlign: 'center', textTransform: 'uppercase' }}>
            SẢN PHẨM LIÊN QUAN
         </Typography>
         <Box sx={{ my: 3 }}>
            <Swiper
               slidesPerView={4}
               spaceBetween={12}
               pagination={{
                  clickable: true
               }}
               className='mySwiper'>
               {data &&
                  data.map((item, index) => {
                     return (
                        <SwiperSlide key={index} style={{ opacity: 1 }}>
                           <ProductCard data={item} />
                        </SwiperSlide>
                     );
                  })}
            </Swiper>
         </Box>
      </React.Fragment>
   );
}

export default RelatedProducts;
