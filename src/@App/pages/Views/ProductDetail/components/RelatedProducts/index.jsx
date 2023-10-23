import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

import React from 'react';

import 'swiper/css';
import 'swiper/css/pagination';

import '../SwiperSlider/style.css';
import ProductCard from '@App/components/customs/common/ProductCard';

const array = [
    'https://ananas.vn/wp-content/uploads/Pro_AGLT0028_1.jpg',
    'https://ananas.vn/wp-content/uploads/Hover-6-2.jpg',
    'https://ananas.vn/wp-content/uploads/Pro_AGLT0028_0.jpg',
    'https://ananas.vn/wp-content/uploads/Pro_AGLT0028_1.jpg',
    'https://ananas.vn/wp-content/uploads/Pro_AGLT0028_2.jpg'
];

function RelatedProducts() {
    return (
        <React.Fragment>
            <Typography variant='h5' sx={{ textAlign: 'center', textTransform: 'uppercase' }}>
                SẢN PHẨM LIÊN QUAN
            </Typography>
            <Box sx={{ my: 3 }}>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true
                    }}
                    className='mySwiper'>
                    {array.map((item, index) => {
                        return (
                            <SwiperSlide key={index} style={{ opacity: 1 }}>
                                <ProductCard />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </Box>
        </React.Fragment>
    );
}

export default RelatedProducts;
