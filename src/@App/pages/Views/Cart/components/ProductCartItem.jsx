import FormLabel from '@Core/Components/FormControl/FormLabel';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

function ProductCartItem() {
   return (
      <Grid container spacing={2}>
         <Grid item xs={3}>
            <img src='https://ananas.vn/wp-content/uploads/Thumbnail-500x500.jpg' width='100%' height='100%' alt='' />
         </Grid>
         <Grid item xs={6}>
            <Stack height='100%' justifyContent='space-between'>
               <Box>
                  <Typography variant='h5' sx={{ fontSize: '22px !important', fontWeight: 'bold' }}>
                     Graphic Tee - Skate 4p - Snow White
                  </Typography>
                  <Box>
                     <Box component='p' sx={{ color: '#808080', fontSize: '18px', mt: 1.5 }}>
                        Giá: {''}
                        <Box component='span'>350.000 VND</Box>
                     </Box>
                  </Box>
               </Box>
               <Stack flexDirection='row' gap={2}>
                  <Box>
                     <FormLabel title='Size' gutterBottom required />
                     <TextField sx={{ width: 150 }} />
                  </Box>
                  <Box>
                     <FormLabel title='Số lượng' gutterBottom required />
                     <TextField sx={{ width: 150 }} />
                  </Box>
               </Stack>
            </Stack>
         </Grid>
         <Grid
            item
            xs={3}
            component={Stack}
            flexDirection='column'
            justifyContent='space-between'
            alignItems='flex-end'>
            <Box>
               <Typography
                  variant='h6'
                  sx={({ palette }) => ({
                     fontWeight: 'bold ',
                     color: palette.education.text.main
                  })}>
                  700.000 VND
               </Typography>
               <Box
                  component='p'
                  sx={({ palette }) => ({
                     textAlign: 'end',
                     fontSize: '20px',
                     color: palette.education.text.main
                  })}>
                  Còn hàng
               </Box>
            </Box>
            <Button
               fullWidth
               sx={({ palette }) => ({
                  py: 1,
                  bgcolor: palette.education.text.black,
                  ':hover': {
                     bgcolor: palette.education.text.black
                  }
               })}>
               <DeleteIcon />
            </Button>
         </Grid>
      </Grid>
   );
}

export default ProductCartItem;
