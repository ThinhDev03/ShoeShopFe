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

import React, { useCallback } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Autocomplete, TextField, Box, Typography, CircularProgress } from '@mui/material';
import { Controller } from 'react-hook-form';
import { find, map, isObject } from 'lodash';

const CoreAutoComplete = props => {
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
        ...restProps
    } = props;

    const getValueOptions = useCallback(
        value => {
            if (multiple) {
                const values = map(value, v => {
                    if (!isObject(v)) {
                        const option =
                            find(options, item => {
                                return get(item, valuePath) === v;
                            }) ?? null;
                        return option;
                    }
                    return v;
                }).filter(Boolean);

                return values;
            }

            if (returnValueType === 'enum') {
                return find(options, item => get(item, valuePath) === value) ?? null;
            }
            return value;
        },
        [options]
    );

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
                return (
                    <>
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
                            getOptionLabel={option => {
                                return get(option, labelPath) ?? '';
                            }}
                            isOptionEqualToValue={(option, value) => {
                                if (value instanceof Object) {
                                    return get(option, valuePath) === get(value, valuePath);
                                }
                                return get(option, valuePath) === value;
                            }}
                            loading={loading}
                            disabled={disabled}
                            readOnly={readOnly}
                            noOptionsText='No options!!!'
                            onChange={(_, value) => {
                                return returnValueType === 'enum'
                                    ? onChange(
                                          multiple
                                              ? value.map(v => get(v, valuePath))
                                              : get(value, valuePath)
                                      )
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
                            renderInput={params => {
                                return (
                                    <TextField
                                        {...params}
                                        inputRef={ref}
                                        placeholder={placeholder}
                                        error={Boolean(error)}
                                        helperText={error && error.message}
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
                                            ...params.InputProps,
                                            endAdornment: (
                                                <>
                                                    {loading ? (
                                                        <CircularProgress
                                                            color='inherit'
                                                            size={20}
                                                        />
                                                    ) : null}
                                                    {params.InputProps.endAdornment}
                                                </>
                                            )
                                        }}
                                    />
                                );
                            }}
                            {...restProps}
                        />
                    </>
                );
            }}
        />
    );
};

CoreAutoComplete.defaultProps = {
    name: null,
    control: null,
    options: [],
    disabled: false,
    placeholder: '',
    multiple: false,
    labelPath: 'label',
    valuePath: 'value',
    loading: false,
    readOnly: false,
    required: false,
    returnValueType: 'option',
    legendLabel: null,
};

CoreAutoComplete.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    options: PropTypes.array,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    multiple: PropTypes.bool,
    labelPath: PropTypes.string,
    valuePath: PropTypes.string,
    loading: PropTypes.bool,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    returnValueType: PropTypes.string,
    legendLabel: PropTypes.string,
};

export default React.memo(CoreAutoComplete);
