import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function PostItem() {
   return (
      <Box>
         <Box component={Link} to=''>
            <img
               src='https://ananas.vn/wp-content/uploads/kvngang_mobile_web-300x160.jpg'
               width='100%'
               height='100%'
               alt=''
            />
         </Box>
         <Box mt={1}>
            <Typography variant='h6' sx={{ fontSize: '18px !important' }}>
               URBAS CORLURAY PACK
            </Typography>
            <Box
               component='p'
               sx={{
                  mt: 1,
                  fontSize: '16px',
                  display: 'block',
                  textOverflow: 'ellipsis',
                  wordWrap: 'break-word',
                  overflow: 'hidden',
                  maxHeight: '5.6em',
                  lineHeight: '1.4em',
                  // display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical'
               }}>
               Urbas Corluray Pack đem đến lựa chọn “làm mới mình” với sự kết hợp 5 gam màu mang sắc thu; phù hợp với
               những người trẻ năng động, mong muốn thể hiện cá tính riêng biệt khó trùng lặp.
            </Box>
            <Box
               component={Link}
               to='/'
               sx={({ palette }) => ({
                  color: palette.education.text.main,
                  textDecoration: 'none'
               })}>
               Đọc thêm
            </Box>
         </Box>
      </Box>
   );
}

export default PostItem;
