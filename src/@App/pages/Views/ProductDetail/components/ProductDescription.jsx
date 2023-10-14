import {
   Box,
   Button,
   FormControlLabel,
   MenuItem,
   Radio,
   RadioGroup,
   Select,
   Stack,
   TextField,
   Typography
} from '@mui/material';
import React from 'react';
import AccordionDescription from './AccordionDescription';

function ProductDescription() {
   return (
      <React.Fragment>
         <Stack sx={{ padding: '0 24px', gap: '30px' }}>
            <Typography variant='h5'>Pattas Tomo - Low Top - Blarney</Typography>
            <Stack flexDirection='row' justifyContent='space-between'>
               <Box sx={{ display: 'flex', gap: 2, fontSize: '18px' }}>
                  Mã sản phẩm:
                  <strong>AV00180</strong>
               </Box>
               <Box sx={{ display: 'flex', gap: 2, fontSize: '18px' }}>
                  Tình trạng:
                  <strong>New Arrival</strong>
               </Box>
            </Stack>
            <Typography variant='h5' sx={({ palette }) => ({ color: palette.education.text.main, fontWeight: 600 })}>
               390.000 VND
            </Typography>
            <Box sx={{ borderTop: '1px dashed #333' }}></Box>
            <RadioGroup
               aria-labelledby='demo-radio-buttons-group-label'
               defaultValue='female'
               name='radio-buttons-group'
               sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
               <FormControlLabel value='female' control={<Radio />} label='Trắng' />
               <FormControlLabel value='male' control={<Radio />} label='Đen' />
               <FormControlLabel value='other' control={<Radio />} label='Xanh' />
            </RadioGroup>
            <Box sx={{ borderTop: '1px dashed #333' }}></Box>
            <Stack flexDirection='row' alignItems='center' gap={2}>
               <Box sx={{ width: '50%' }}>
                  <Typography sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Color</Typography>
                  <Select fullWidth>
                     <MenuItem value={10}>X</MenuItem>
                     <MenuItem value={20}>M</MenuItem>
                     <MenuItem value={30}>L</MenuItem>
                     <MenuItem value={30}>XL</MenuItem>
                     <MenuItem value={30}>2XL</MenuItem>
                  </Select>
               </Box>
               <Box sx={{ width: '50%', mt: 0 }}>
                  <Typography sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Số lượng</Typography>
                  <TextField />
               </Box>
            </Stack>
            <Stack gap={1}>
               <Button
                  fullWidth
                  sx={({ palette }) => ({
                     textTransform: 'uppercase',
                     py: '18px',
                     bgcolor: palette.education.text.black,
                     ':hover': {
                        bgcolor: palette.education.text.black
                     }
                  })}>
                  Thêm vào giỏ hàng
               </Button>
               <Button fullWidth sx={{ textTransform: 'uppercase', py: '18px' }}>
                  Thanh toán
               </Button>
            </Stack>
            <AccordionDescription />
         </Stack>
      </React.Fragment>
   );
}

export default React.memo(ProductDescription);
