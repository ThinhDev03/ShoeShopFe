import { Box, Container, Grid, Pagination } from '@mui/material';
import ProductCard from '@App/components/customs/common/ProductCard';
import { useQuery } from '@tanstack/react-query';
import productService from '@App/services/product.service';
import ProductCardSekeleton from '@App/components/customs/common/ProductCard/ProductCardSekeleton';
import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';

function LatestProduct() {
   const { data: productList, isFetching } = useQuery(['getProduct-latest'], async () => {
      const rest = await productService.list({ limit: 16 });
      return rest;
   });

   return (
      <Container maxWidth='lg' sx={{ py: 3 }}>
         <Grid container spacing={3}>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                     <Box
                        sx={{
                           borderRadius: '5px',
                           my: 2,
                           width: '200px'
                        }}>
                        <Box
                           component={LazyLoadingImage}
                           src='https://ananas.vn/wp-content/themes/ananas/fe-assets/images/news_discover.png'
                           alt='banner'
                           sx={{ width: '200px' }}
                        />
                     </Box>
                  </Box>
               </Grid>
               <Grid item xs={12}>
                  <Box sx={{ width: '100%', overflow: 'hidden', borderRadius: '5px', mb: 2 }}>
                     <Box
                        component={LazyLoadingImage}
                        src='https://ananas.vn/wp-content/uploads/Corluray_bannerweb_desktop1920x1050.jpg'
                        alt='banner'
                        sx={{ width: '100%' }}
                     />
                  </Box>
               </Grid>
               {isFetching
                  ? Array.from({ length: 6 }, (_, index) => index).map((item) => (
                       <Grid item xs={6} md={3} key={item}>
                          <ProductCardSekeleton />
                       </Grid>
                    ))
                  : productList?.data?.map(( product ) => {
                       return (
                          <Grid item xs={6} md={3} key={product._id}>
                             <ProductCard data={product} sale={product.max_sale} />
                          </Grid>
                       );
                    })}
            </Grid>
         </Grid>
      </Container>
   );
}

export default LatestProduct;
