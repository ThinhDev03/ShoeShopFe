import { Controller } from 'react-hook-form';
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

const ControllerSelectCustom = (props) => {
   const { options, _value, _title, children, callback } = props;
   const { control, name, placeholder, disabled, defaultValue, label, ...rest } = props;

   return (
      <Controller
         render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth>
               <InputLabel size='small' id='demo-simple-select-label'>
                  {label}
               </InputLabel>
               <Select
                  id={name}
                  fullWidth
                  error={Boolean(error)}
                  placeholder={disabled ? void 0 : placeholder}
                  disabled={disabled}
                  label={label}
                  {...field}
                  {...rest}
                  onChange={(e) => {
                     field.onChange(e.target.value);
                     callback()
                  }}>
                  {(children && children) ||
                     options?.map((item, index) => (
                        <MenuItem key={index} value={item?.[_value]}>
                           {item?.[_title]}
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
ControllerSelectCustom.defaultProps = {
   _value: 'value',
   _title: 'label'
};

export default ControllerSelectCustom;
