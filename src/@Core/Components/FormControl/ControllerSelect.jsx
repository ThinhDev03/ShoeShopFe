import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
// mui
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

/**
 *
 * @param {*} props
 * @interface Props {label: string, options: string[]}
 */

const ControllerSelect = (props) => {
    const { options, _value, _title } = props;
    const { control, name, placeholder, disabled, defaultValue, ...rest } = props;

    return (
        <Controller
            render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth>
                    <Select
                        id={name}
                        fullWidth
                        error={Boolean(error)}
                        placeholder={disabled ? void 0 : placeholder}
                        disabled={disabled}
                        {...field}
                        {...rest}>
                        {options?.map((item, index) => (
                            <MenuItem key={index} value={item[_value]}>
                                {item[_title]}
                            </MenuItem>
                        ))}
                    </Select>
                    {error?.message && (
                        <FormHelperText sx={{ color: '#d32f2f' }} variant='outlined'>
                            {error.message}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
            name={name}
            defaultValue={defaultValue || ''}
            control={control}
        />
    );
};

export default ControllerSelect;
