import { useWishlist } from '@App/redux/slices/wishlist.slice';
import React from 'react';
import ProductWishlist from './components/ProductWishlist';
import { Container, Grid, Typography } from '@mui/material';

function WishlishPage() {
   const { wishlist } = useWishlist();
   console.log(wishlist);
   return (
      <Container maxWidth='lg'>
         <Typography component='h2' variant='h4' textAlign='center' my={3}>
            Danh sách yêu thích
         </Typography>
         <Grid container spacing={3}>
            {wishlist.map((product) => {
               return (
                  <Grid item xs={6}>
                     <ProductWishlist data={product} key={product._id} />
                  </Grid>
               );
            })}
         </Grid>
         {wishlist && wishlist.length === 0 && (
            <Typography sx={{ textAlign: 'center', marginTop: '30px' }}>Không có sản phẩm yêu thích.</Typography>
         )}
      </Container>
   );
}

export default WishlishPage;
