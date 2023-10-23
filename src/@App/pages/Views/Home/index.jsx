import React from 'react';
import SwiperSlider from './components/SwiperSlider';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import PostItem from './components/PostItem';
import { Link } from 'react-router-dom';

const posts = [
   {
      title: 'ALL BLACK IN BLACK',
      description:
         'Mặc dù được ứng dụng rất nhiều, nhưng sắc đen lúc nào cũng toát lên một vẻ huyền bí không nhàm chán',
      image: 'https://ananas.vn/wp-content/uploads/banner-phu%CC%A3_2m-600x320.jpg'
   },
   {
      title: 'OUTLET SALE',
      description:
         'Danh mục những  sản phẩm bán tại "giá tốt hơn" chỉ được bán kênh online - Online Only, chúng đã từng làm mưa làm gió một thời gian và hiện đang rơi vào tình trạng bể size, bể số.',
      image: 'https://ananas.vn/wp-content/uploads/Banner_Sale-off-1.jpg'
   }
];

const category = [
   {
      image: 'https://ananas.vn/wp-content/uploads/catalogy-1.jpg',
      title: 'Giày Nam',
      list: ['New Arrivals', 'Best Seller', 'Sale-off']
   },
   {
      image: 'https://ananas.vn/wp-content/uploads/catalogy-2.jpg',
      title: 'Giày Nữ',
      list: ['New Arrivals', 'Best Seller', 'Sale-off']
   },
   {
      image: 'https://ananas.vn/wp-content/uploads/catalogy-3.jpg',
      title: 'Dòng sản phẩm',
      list: ['Basas', 'Vintas', 'Urbas', 'Pattas']
   }
];

function Home() {
   return (
      <React.Fragment>
         <SwiperSlider />
         <Container maxWidth='lg' sx={{ marginTop: 10 }}>
            <Grid container spacing={4}>
               {posts.map((item, index) => {
                  return (
                     <Grid item xs={6} key={index}>
                        <Box>
                           <img src={item.image} width='100%' height='100%' alt='' />
                        </Box>
                        <Stack gap={1} mt={2}>
                           <Typography
                              variant='h5'
                              component={Link}
                              to='/'
                              sx={({ palette }) => ({
                                 textDecoration: 'none',
                                 color: palette.education.text.black,
                                 fontWeight: 'bold',
                                 ':hover': {
                                    color: palette.primary.main
                                 }
                              })}>
                              {item.title}
                           </Typography>
                           <Typography variant='p'>{item.description}</Typography>
                        </Stack>
                     </Grid>
                  );
               })}

               <Grid container spacing={3} mt={10}>
                  <Grid item xs={12}>
                     <Typography variant='h4' textAlign='center'>
                        DANH MỤC MUA HÀNG
                     </Typography>
                  </Grid>
                  {category.map((item, index) => {
                     return (
                        <Grid item xs={4} key={index}>
                           <Box sx={{ position: 'relative' }}>
                              <img src={item.image} alt='' />
                              <Box
                                 sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                 }}>
                                 <Typography
                                    variant='h5'
                                    sx={({ palette }) => ({
                                       fontWeight: 'bold',
                                       color: palette.education.text.white
                                    })}>
                                    {item.title}
                                 </Typography>
                                 <Stack gap={1} mt={1}>
                                    {item.list.map((content, index) => {
                                       return (
                                          <Typography
                                             key={index}
                                             variant='p'
                                             component={Link}
                                             to='/'
                                             sx={({ palette }) => ({
                                                color: palette.education.text.white,
                                                textDecoration: 'none',
                                                fontSize: '22px !important',
                                                ':hover': {
                                                   color: palette.education.text.main
                                                }
                                             })}>
                                             {content}
                                          </Typography>
                                       );
                                    })}
                                 </Stack>
                              </Box>
                           </Box>
                        </Grid>
                     );
                  })}
               </Grid>
            </Grid>
         </Container>
         <Box mt={5} width='100%'>
            <img src='https://ananas.vn/wp-content/uploads/Banner_Clothing.jpg' width='100%' alt='' />
         </Box>
         <Container maxWidth='lg' sx={{ marginTop: 10 }}>
            <Grid container spacing={4}>
               <Grid item xs={12} md={6}>
                  <Typography variant='h4' textAlign='center'>
                     INSTAGRAM
                  </Typography>
               </Grid>
               <Grid item xs={12} md={6}>
                  <Typography variant='h4' textAlign='center'>
                     TIN TỨC & BÀI VIẾT
                  </Typography>
                  <Grid container spacing={2} mt={1}>
                     <Grid item xs={12} md={6}>
                        <PostItem />
                     </Grid>
                     <Grid item xs={12} md={6}>
                        <PostItem />
                     </Grid>
                  </Grid>
               </Grid>
            </Grid>
         </Container>
      </React.Fragment>
   );
}

export default Home;
