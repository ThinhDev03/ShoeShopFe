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
import { FormControlLabel, Checkbox } from '@mui/material';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

const CoreCheckBox = props => {
    const { name, control, label, labelClassName } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, ref } }) => {
                return (
                    <FormControlLabel
                        className={labelClassName}
                        label={label}
                        control={
                            <Checkbox
                                ref={ref}
                                onChange={e => onChange(e.target.checked)}
                                checked={Boolean(value)}
                            />
                        }
                    />
                );
            }}
        />
    );
};

CoreCheckBox.defaultValue = {
    name: null,
    control: null,
    label: '',
    labelClassName: ''
};

CoreCheckBox.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    label: PropTypes.string,
    labelClassName: PropTypes.string
};

export default React.memo(CoreCheckBox);
