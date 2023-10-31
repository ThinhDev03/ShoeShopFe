import { Box } from '@mui/material';
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
const Scrollbar = ({ ...props }) => (
   <Box component={SimpleBar} {...props}>
      {props.children}
   </Box>
);

export default Scrollbar;
