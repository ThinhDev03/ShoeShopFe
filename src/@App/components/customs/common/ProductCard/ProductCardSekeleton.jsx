import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

function ProductCardSekeleton() {
   return (
      <Stack gap={1}>
         <Skeleton variant='rectangular' width={276} height={276} />
         <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
         <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
         <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
      </Stack>
   );
}

export default ProductCardSekeleton;
