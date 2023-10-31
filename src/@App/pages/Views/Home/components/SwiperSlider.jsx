import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './style.css';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Box } from '@mui/material';

const listLider = [
   'https://ananas.vn/wp-content/uploads/Web1920-1.jpeg',
   'https://ananas.vn/wp-content/uploads/Hi-im-Mule_1920x1050-Desktop.jpg'
];

function SwiperSlider() {
   return (
      <Swiper
         cssMode={true}
         navigation={true}
         pagination={true}
         mousewheel={true}
         keyboard={true}
         modules={[Navigation, Pagination, Mousewheel, Keyboard]}
         className='mySwiper'>
         {listLider.map((item, index) => {
            return (
               <SwiperSlide key={index}>
                  <img src={item} alt='' width='100%' height='100%' />
               </SwiperSlide>
            );
         })}
      </Swiper>
   );
}

export default SwiperSlider;
