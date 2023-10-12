import { Box } from '@mui/material';
import 'simplebar-react/dist/simplebar.min.css';

const Scrollbar = ({ sx, ...props }) => (
   <Box
      sx={{
         overflow: 'auto',
         ...sx
      }}
      {...props}>
      {props.children}
   </Box>
);

export default Scrollbar;
