import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, TextField } from '@mui/material';

function SearchProduct({ control }) {
   return (
      <Box>
         <ControllerTextField
            fullWidth
            placeholder='Tìm kiếm'
            control={control}
            name='search'
            InputProps={{
               startAdornment: (
                  <InputAdornment position='start'>
                     <SearchIcon />
                  </InputAdornment>
               )
            }}
         />
      </Box>
   );
}

export default SearchProduct;
