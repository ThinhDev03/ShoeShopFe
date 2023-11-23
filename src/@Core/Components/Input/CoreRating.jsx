/*
 * Created Date: 03-02-2023, 21:00 pm
 * Author: Nghiêm Mạnh Cường
 * Email: nghiemmanhcuong98@gmail.com
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) Đỗ Thành trung
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import React from 'react';
import { Controller } from 'react-hook-form';
import { Box, FormHelperText, Rating } from '@mui/material';

const CoreRating = (props) => {
   const { name, control, defaultValue, className, ...restProps } = props;

   return (
      <Controller
         name={name}
         control={control}
         render={({ field: { onChange, ref, value }, fieldState: { error } }) => {
            return (
               <Box className='flex items-center gap-x-20'>
                  <Box className={className}>
                     <Rating
                        defaultValue={defaultValue}
                        value={value || 0}
                        onChange={onChange}
                        ref={ref}
                        {...restProps}
                     />
                     {error && error.message ? <FormHelperText error>{error.message}</FormHelperText> : null}
                  </Box>
               </Box>
            );
         }}
      />
   );
};

CoreRating.defaultProps = {
   className: '',
   defaultValue: null
};

export default React.memo(CoreRating);
