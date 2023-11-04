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
import { useSwiper } from 'swiper/react';
function SwiperSlider({ productDetails, slideIndex }) {
   const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
               {productDetails.map((item) => {
                  return (
                     <SwiperSlide key={item._id}>
                        <LazyLoadingImage src={item.image_id.image_url} />
                     </SwiperSlide>
                  );
               })}
            </Swiper>
            {productDetails && productDetails.length > 0 && (
               <Swiper
                  spaceBetween={10}
                  onSwiper={setThumbsSwiper}
                  slidesPerView={4}
                  freeMode={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  pagination={true}
                  navigation={true}
                  className='mySwiper'>
                  {productDetails.map((item, index) => {
                     return (
                        <SwiperSlide key={item._id} virtualIndex={index}>
                           <LazyLoadingImage src={item.image_id.image_url} />
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
