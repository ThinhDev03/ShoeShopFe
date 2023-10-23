import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import FormShipping from './component/FormShipping';
import Invoice from './component/Invoice';
import { Link } from 'react-router-dom';

function Shipping() {
   return (
      <Container maxWidth='lg' sx={{ py: 3 }}>
         {/* <Grid container spacing={2}>
            <Grid item xs={7}>
               <Box sx={{ padding: '8px 12px', backgroundColor: '#f1f1f1', mb: '12px' }}>
                  <Typography variant='h5' fontWeight='bold'>
                     Giỏ hàng
                  </Typography>
               </Box>
               <FormShipping />
            </Grid>
            <Grid item xs={5}>
               <Invoice />
            </Grid>
         </Grid> */}
         <Stack gap={3}>
            <Typography variant='h4' fontWeight='bold' textAlign='center'>
               Giỏ hàng của bạn
            </Typography>
            <Box sx={{ borderBottom: '1px solid #000', my: 2 }}></Box>

            <Box textAlign='center' fontSize='18px'>
               Bạn đang không có sản phẩm nào trong giỏ hàng!
            </Box>
            <Box display='flex' justifyContent='center' mt={4}>
               <Button
                  component={Link}
                  to='/products'
                  sx={({ palette }) => ({
                     padding: '10px 32px',
                     backgroundColor: palette.education.text.black,
                     ':hover': {
                        backgroundColor: palette.education.text.black
                     }
                  })}>
                  QUAY LẠI MUA HÀNG
               </Button>
            </Box>
         </Stack>
      </Container>
   );
}

export default Shipping;
