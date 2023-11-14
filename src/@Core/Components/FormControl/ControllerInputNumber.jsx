import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
/**
 * @param {*} props
 * @interface  Props<T> extends Omit<TextFieldProps, 'name'> {name: FieldPath<T>control: Control<T>};
 * @returns Form controller JSX element
 */

const ControllerInputNumber = (props) => {
   const { control, name, placeholder, disabled, ...rest } = props;
   return (
      <Controller
         render={({ field, fieldState: { error } }) => (
            <TextField
               id={name}
               fullWidth
               error={Boolean(error)}
               helperText={error?.message && error.message}
               placeholder={disabled ? void 0 : placeholder}
               disabled={disabled}
               {...field}
               onChange={(event) =>
                  field.onChange(event.target.value.match(/[^0-9]/g) ? 1 : Number(event.target.value))
               }
               {...rest}
            />
         )}
         name={name}
         control={control}
      />
   );
};
ControllerInputNumber.propTypes = {
   control: PropTypes.object.isRequired,
   name: PropTypes.string.isRequired,
   placeholder: PropTypes.string,
   disabled: PropTypes.bool
};
export default ControllerInputNumber;
