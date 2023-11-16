import React, { useCallback } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Autocomplete, TextField, Box, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { find, map, isObject } from 'lodash';
import { useTheme } from '@emotion/react';

const AutoComplateProvince = (props) => {
   const { palette } = useTheme();
   const {
      name,
      control,
      options,
      disabled,
      placeholder,
      multiple,
      labelPath,
      valuePath,
      loading,
      readOnly,
      required,
      returnValueType,
      legendLabel,
      onChangeSelect,
      className,
      disabledDeleteIcon,
      ...restProps
   } = props;

   const getValueOptions = useCallback(
      (value) => {
         if (multiple) {
            const values = map(value, (v) => {
               if (!isObject(v)) {
                  const option =
                     find(options, (item) => {
                        return get(item, valuePath) === v;
                     }) ?? null;
                  return option;
               }
               return v;
            }).filter(Boolean);

            return values;
         }

         if (returnValueType === 'enum') {
            return find(options, (item) => get(item, valuePath) === value) ?? null;
         }
         return value;
      },
      [options]
   );

   return (
      <Box className={className}>
         <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
               return (
                  <React.Fragment>
                     {legendLabel ? (
                        <Typography variant='h5' component='label'>
                           {legendLabel}
                        </Typography>
                     ) : null}
                     <Autocomplete
                        fullWidth
                        multiple={multiple}
                        options={options}
                        onBlur={onBlur}
                        size='small'
                        getOptionLabel={(option) => {
                           return get(option, labelPath) ?? '';
                        }}
                        isOptionEqualToValue={(option, value) => {
                           if (value instanceof Object) {
                              return get(option, valuePath) === get(value, valuePath);
                           }
                           return get(option, valuePath) === value;
                        }}
                        clearIcon={!disabledDeleteIcon}
                        loading={loading}
                        disabled={disabled}
                        noOptionsText='No options!!!'
                        onChange={(_, value) => {
                           return returnValueType === 'enum'
                              ? onChange(multiple ? value.map((v) => get(v, valuePath)) : get(value, valuePath))
                              : onChange(value);
                        }}
                        value={getValueOptions(value)}
                        renderOption={(props, option) => {
                           return (
                              <Box {...props} key={option[labelPath]}>
                                 {get(option, labelPath)}
                              </Box>
                           );
                        }}
                        renderInput={(params) => {
                           return (
                              <TextField
                                 {...params}
                                 inputRef={ref}
                                 placeholder={loading ? 'Đang tải ...' : placeholder}
                                 error={Boolean(error)}
                                 size='small'
                                 sx={{ backgroundColor: disabled ? palette.disabled : '#fff' }}
                                 helperText={error && error.message}
                                 FormHelperTextProps={{ sx: { margin: '4px 0 0 0' } }}
                                 InputLabelProps={{
                                    ...params.InputLabelProps,
                                    shrink: true,
                                    required
                                 }}
                                 inputProps={{
                                    ...params.inputProps,
                                    readOnly
                                 }}
                                 InputProps={{
                                    ...params.InputProps
                                 }}
                                 onChange={(event, value) => {
                                    onChange(value);
                                    if (onChangeSelect) {
                                       onChangeSelect(event.target.value);
                                    }
                                 }}
                              />
                           );
                        }}
                        filterOptions={(options, { inputValue }) =>
                           options.filter((option) =>
                              option[labelPath].toLowerCase().includes(inputValue.toLowerCase())
                           )
                        }
                        {...restProps}
                     />
                  </React.Fragment>
               );
            }}
         />
      </Box>
   );
};

export default AutoComplateProvince;
