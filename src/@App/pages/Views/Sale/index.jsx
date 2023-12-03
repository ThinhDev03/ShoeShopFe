import { Box, Container, Grid, Pagination } from '@mui/material';
import ProductCard from '@App/components/customs/common/ProductCard';
import { useQuery } from '@tanstack/react-query';
import productService from '@App/services/product.service';
import ProductCardSekeleton from '@App/components/customs/common/ProductCard/ProductCardSekeleton';
import { useForm } from 'react-hook-form';
import useDebounceInput from '@App/hooks/useDebounceInput';
import { useState } from 'react';
import LazyLoadingImage from '@App/components/customs/LazyLoadingImage';
function Sale() {
   const [currentPage, setCurrentPage] = useState(1);
   const form = useForm({ mode: 'onChange', defaultValues: { search: '', category: '' } });
   const searchValue = form.watch('search');
   const category = form.watch('category');
   const brand = form.watch('brand');
   const search = useDebounceInput(searchValue);

   const { data: productList, isFetching } = useQuery(
      ['getProduct-sale', search, category, brand, currentPage],
      async () => {
         const res = await productService.find('get-sale');
         return res;
      }
   );


   return (
      <Container maxWidth='lg' sx={{ py: 3 }}>
         <Grid container spacing={3}>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Box sx={{ width: '100%', overflow: 'hidden', borderRadius: '5px', mb: 2 }}>
                     <Box
                        component={LazyLoadingImage}
                        src='https://ananas.vn/wp-content/uploads/BMPL_Desktop_Banner_1200x300.png'
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
                  : productList?.data?.map((product) => {
                       return (
                          <Grid item xs={6} md={3} key={product._id}>
                             <ProductCard data={product} sale={product.max_sale} />
                          </Grid>
                       );
                    })}

               <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
                  <Pagination
                     count={productList?.totalPage || 1}
                     onChange={(_, page) => {
                        setCurrentPage(page);
                     }}
                     defaultPage={productList?.currentPage || 1}
                     color='primary'
                  />
               </Grid>
            </Grid>
         </Grid>
      </Container>
   );
}

export default Sale;
