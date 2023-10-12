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
import {
    Box,
    Typography,
    FormGroup,
    FormHelperText,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

const CoreCheckBoxGroup = props => {
    const { name, control, legendLabel, options, row } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, ref, value }, fieldState: { error } }) => {
                const handleChange = e => {
                    onChange({
                        ...value,
                        [e.target.name]: e.target.checked
                    });
                };

                return (
                    <Box className='flex items-center gap-x-20'>
                        {legendLabel ? (
                            <Typography variant='h5' component='label'>
                                {legendLabel}
                            </Typography>
                        ) : null}
                        <Box className='w-full'>
                            <Box className='rounded-[4px] border border-gray-400 py-3 px-5'>
                                <FormGroup row={row}>
                                    {options.map((field, index) => {
                                        return (
                                            <FormControlLabel
                                                key={index}
                                                label={<Typography variant='body2'>{field?.label}</Typography>}
                                                control={
                                                    <Checkbox
                                                        name={field?.key}
                                                        onChange={e => handleChange(e)}
                                                        checked={Boolean(value[field?.key])}
                                                        disabled={field?.disabled}
                                                        color='primary'
                                                    />
                                                }
                                            />
                                        );
                                    })}
                                </FormGroup>
                            </Box>
                            {error && error.message ? (
                                <FormHelperText error>{error.message}</FormHelperText>
                            ) : null}
                        </Box>
                    </Box>
                );
            }}
        />
    );
};

CoreCheckBoxGroup.defaultValue = {
    name: null,
    control: null,
    legendLabel: '',
    options: [],
    row: true
};

CoreCheckBoxGroup.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    legendLabel: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            disabled: PropTypes.bool
        })
    ),
    row: PropTypes.bool
};

export default React.memo(CoreCheckBoxGroup);
