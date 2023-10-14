import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import './style.css';

const array = [
   'https://ananas.vn/wp-content/uploads/Pro_AGLT0028_1.jpg',
   'https://ananas.vn/wp-content/uploads/Hover-6-2.jpg',
   'https://ananas.vn/wp-content/uploads/Pro_AGLT0028_0.jpg',
   'https://ananas.vn/wp-content/uploads/Pro_AGLT0028_1.jpg',
   'https://ananas.vn/wp-content/uploads/Pro_AGLT0028_2.jpg'
];

function SwiperSlider() {
   const [thumbsSwiper, setThumbsSwiper] = useState(null);

   return (
      <React.Fragment>
         <Swiper
            style={{
               '--swiper-navigation-color': '#fff',
               '--swiper-pagination-color': '#fff'
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className='mySwiper2'>
            {array.map((item, index) => {
               return (
                  <SwiperSlide key={index}>
                     <img src={item} />
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
            {array.map((item, index) => {
               return (
                  <SwiperSlide key={index}>
                     <img src={item} />
                  </SwiperSlide>
               );
            })}
         </Swiper>
      </React.Fragment>
   );
}

export default React.memo(SwiperSlider);
