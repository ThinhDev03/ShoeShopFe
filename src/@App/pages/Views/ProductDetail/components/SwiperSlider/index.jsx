import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import './style.css';
import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';
import { useQuery } from '@tanstack/react-query';
import productService from '@App/services/product.service';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

function SwiperSlider() {
   const { id } = useParams();
   const [thumbsSwiper, setThumbsSwiper] = useState(null);

   const { data: productImage } = useQuery(['getProductImage'], async () => {
      const rest = await productService.getImageProduct(id);
      return rest.data;
   });

   return (
      <Box sx={{}}>
         <Swiper
            style={{
               '--swiper-navigation-color': '#fff',
               '--swiper-pagination-color': '#fff',
               height: '500px'
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className='mySwiper2'>
            {productImage &&
               productImage.map((item) => {
                  return (
                     <SwiperSlide key={item._id}>
                        <LazyLoadingImage src={item.image_url} />
                     </SwiperSlide>
                  );
               })}
         </Swiper>
         <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className='mySwiper'>
            {productImage &&
               productImage.map((item) => {
                  return (
                     <SwiperSlide key={item._id}>
                        <img src={item.image_url} />
                     </SwiperSlide>
                  );
               })}
         </Swiper>
      </Box>
   );
}

export default React.memo(SwiperSlider);
