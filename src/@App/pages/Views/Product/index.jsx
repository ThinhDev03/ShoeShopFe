import { Grid, Pagination } from '@mui/material';
import Filter from './components/Filter';
import ProductCard from '@App/components/customs/common/ProductCard';

function Product() {
   return (
      <Grid container spacing={2}>
         <Grid item xs={4} md={3}>
            <Filter />
         </Grid>
         <Grid item xs={8} md={9}>
            <Grid container spacing={2}>
               <Grid item xs={6} md={4}>
                  <ProductCard />
               </Grid>
               <Grid item xs={6} md={4}>
                  <ProductCard />
               </Grid>
               <Grid item xs={6} md={4}>
                  <ProductCard />
               </Grid>
               <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
                  <Pagination count={10} color='primary' />
               </Grid>
            </Grid>
         </Grid>
      </Grid>
   );
}

export default Product;
