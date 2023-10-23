import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, TextField } from '@mui/material';
import useDebounce from '@App/hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';

function SearchProduct() {
   const [search, setSearch] = useState('');
//    const [debouncedValue, setDebouncedValue] = useState('');
//    const [searchParams, setSearchParams] = useSearchParams();

//    const [debounceFunction, isDone] = useDebounce((value) => {
//       setDebouncedValue(value);
//    }, 500);

   return (
      <Box>
         <TextField
            fullWidth
            placeholder='Tìm kiếm'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

export default React.memo(SearchProduct);
