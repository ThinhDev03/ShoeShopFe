import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { toShortenNumber } from '@Core/Helper/Price';

// ----------------------------------------------------------------------

export default function WidgetSummary({ title, total, icon, color = 'secondary', sx, ...other }) {
   return (
      <Card
         component={Stack}
         spacing={3}
         direction='row'
         sx={{
            px: 3,
            py: 5,
            borderRadius: 2,
            ...sx
         }}
         {...other}>
         {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}

         <Stack spacing={0.5}>
            <Typography sx={{ textTransform: 'uppercase', fontWeight: 800, fontSize: '23px !important' }}>
               {toShortenNumber(total)}
            </Typography>

            <Typography variant='subtitle2' sx={{ color: 'text.disabled' }}>
               {title}
            </Typography>
         </Stack>
      </Card>
   );
}

WidgetSummary.propTypes = {
   color: PropTypes.string,
   icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
   sx: PropTypes.object,
   title: PropTypes.string,
   total: PropTypes.number
};
