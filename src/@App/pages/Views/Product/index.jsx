import { Container, Grid, Pagination } from '@mui/material';
import Filter from './components/Filter';
import ProductCard from '@App/components/customs/common/ProductCard';
import { useQuery } from '@tanstack/react-query';
import productService from '@App/services/product.service';
import ProductCardSekeleton from '@App/components/customs/common/ProductCard/ProductCardSekeleton';

function Product() {
   const { data: productList, isFetching } = useQuery(['getProduct'], async () => {
      const rest = await productService.getAll();
      console.log(rest);
      return rest;
   });
   console.log(productList);
   return (
      <Container maxWidth='lg' sx={{ py: 3 }}>
         <Grid container spacing={2}>
            <Grid item xs={4} md={3}>
               <Filter />
            </Grid>
            <Grid item xs={8} md={9}>
               <Grid container spacing={2}>
                  {isFetching
                     ? Array.from({ length: 6 }, (_, index) => index).map((item) => (
                          <Grid item xs={6} md={4} key={item}>
                             <ProductCardSekeleton />
                          </Grid>
                       ))
                     : productList?.data?.map((product) => {
                          return (
                             <Grid item xs={6} md={4} key={product._id}>
                                <ProductCard data={product} />
                             </Grid>
                          );
                       })}

                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
                     <Pagination
                        count={productList?.totalPage || 10}
                        defaultPage={productList?.currentPage || 1}
                        color='primary'
                     />
                  </Grid>
               </Grid>
            </Grid>
         </Grid>
      </Container>
   );
}

export default Product;
