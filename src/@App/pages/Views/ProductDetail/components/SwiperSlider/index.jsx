import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperContructor from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './style.css';

import { FreeMode, Navigation, Thumbs, Virtual } from 'swiper/modules';
import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import productService from '@App/services/product.service';

function SwiperSlider({ productDetails, slideIndex }) {
   const { id } = useParams();

   const [thumbsSwiper, setThumbsSwiper] = useState(null);

   const { data: productImage } = useQuery(['getImageProduct', id], async () => {
      const res = await productService.getImageProduct(id);
      return res.data;
   });

   return (
      <>
         <Box sx={{}}>
            <Swiper
               style={{
                  '--swiper-navigation-color': '#fff',
                  '--swiper-pagination-color': '#fff',
                  height: '500px'
               }}
               spaceBetween={10}
               pagination={true}
               navigation={true}
               thumbs={{ swiper: thumbsSwiper }}
               modules={[FreeMode, Navigation, Thumbs]}
               className='mySwiper2'>
               {productImage?.map((item, index) => {
                  return (
                     <SwiperSlide key={index}>
                        <LazyLoadingImage src={item.image_url} />
                     </SwiperSlide>
                  );
               })}
            </Swiper>
            {productImage?.length > 0 && (
               <Swiper
                  spaceBetween={10}
                  onSwiper={setThumbsSwiper}
                  slidesPerView={4}
                  freeMode={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  pagination={true}
                  navigation={true}
                  className='mySwiper'>
                  {productImage?.map((item, index) => {
                     return (
                        <SwiperSlide key={index} virtualIndex={index} style={{ width: '100px', height: '100px' }}>
                           <LazyLoadingImage src={item.image_url} />
                        </SwiperSlide>
                     );
                  })}
               </Swiper>
            )}
         </Box>
      </>
   );
}

export default React.memo(SwiperSlider);
