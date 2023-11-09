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
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import { Box, TextField, Typography, FormHelperText } from '@mui/material';

const CoreInput = (props) => {
   const {
      label,
      name,
      control,
      required,
      readOnly,
      placeholder,
      className,
      disabled,
      defaultValue,
      rules,
      multiline,
      minRows,
      maxRows,
      spacing,
      isOutlined,
      ...restProps
   } = props;

   const {
      field: { onChange, onBlur, value, ref },
      fieldState: { error }
   } = useController({
      name,
      control,
      defaultValue,
      rules
   });

   return (
      <Box>
         {label && !isOutlined ? (
            <Typography variant='h5' component='label'>
               {label}
            </Typography>
         ) : null}
         <Box>
            <TextField
               fullWidth
               onChange={onChange}
               onBlur={onBlur}
               inputRef={ref}
               error={Boolean(error)}
               disabled={disabled}
               value={value ? value : ''}
               placeholder={placeholder}
               required={required}
               multiline={multiline}
               minRows={minRows}
               maxRows={maxRows}
               inputProps={{
                  readOnly
               }}
               label={isOutlined ? label : ''}
               {...restProps}
            />
         </Box>
         {error && error.message ? <FormHelperText error>{error.message}</FormHelperText> : null}
      </Box>
   );
};

CoreInput.defaultProps = {
   label: null,
   name: null,
   required: false,
   readOnly: false,
   placeholder: null,
   className: null,
   disabled: false,
   defaultValue: '',
   multiline: false,
   minRows: 3,
   maxRows: 5
};

CoreInput.propTypes = {
   label: PropTypes.string,
   name: PropTypes.string.isRequired,
   control: PropTypes.object.isRequired,
   required: PropTypes.bool,
   readOnly: PropTypes.bool,
   placeholder: PropTypes.string,
   className: PropTypes.string,
   disabled: PropTypes.bool,
   defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   rules: PropTypes.object,
   multiline: PropTypes.bool,
   minRows: PropTypes.number,
   maxRows: PropTypes.number
};

export default React.memo(CoreInput);
