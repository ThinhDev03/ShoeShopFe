import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, styled } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * @param {*} props
 * @interface  Props<T> extends Omit<TextFieldProps, 'name'> {name: FieldPath<T>control: Control<T>};
 * @returns Form controller JSX element
 */

const ControllerTextarea = ({ name, control, minRows = 4, disabled, placeholder, ...rest }) => {
   return (
      <Controller
         render={({ field, fieldState: { error } }) => {
            return (
               <FormControl error={Boolean(error)} sx={{ width: '100%', height: '100%' }}>
                  <ExtendTextareaAutosize
                     minRows={minRows}
                     // error={Boolean(error)}
                     placeholder={disabled ? void 0 : placeholder}
                     disabled={disabled}
                     {...field}
                     {...rest}
                     sx={{ borderColor: Boolean(error) ? '#d32f2f' : '#d0d7de' }}
                  />
                  {error?.message && <FormHelperText variant='standard'>{error.message}</FormHelperText>}
               </FormControl>
            );
         }}
         name={name}
         control={control}
      />
   );
};

const ExtendTextareaAutosize = styled(TextareaAutosize)(({ theme }) => {
   return {
      borderRadius: '3px',
      width: '100%',

      '&:hover': {
         borderColor: theme.palette.education.text.black
      },
      '&:focus-visible': {
         borderWidth: '2px',
         borderColor: theme.palette.primary.main,
         outline: 0
      }
   };
});

ControllerTextarea.propTypes = {
   control: PropTypes.object.isRequired,
   name: PropTypes.string.isRequired,
   placeholder: PropTypes.string,
   disabled: PropTypes.bool
};

export default ControllerTextarea;
