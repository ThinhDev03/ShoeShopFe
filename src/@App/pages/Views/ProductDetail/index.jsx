import { Box, Breadcrumbs, Container, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import SwiperSlider from './components/SwiperSlider';
import ProductDescription from './components/ProductDescription';
import RelatedProducts from './components/RelatedProducts';

function ProductDetail() {
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
                    <SwiperSlider />
                </Grid>
                <Grid item md={5}>
                    <ProductDescription />
                </Grid>
            </Grid>
            <Box sx={{ borderTop: '1px dashed #333', my: 5 }}></Box>
            <RelatedProducts />
        </Container>
    );
}

export default ProductDetail;
