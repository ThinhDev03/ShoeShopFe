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
//  */

import React, { forwardRef } from 'react';
import { Box, TextField, Typography, FormHelperText } from '@mui/material';
import ReactDatePicker from 'react-datepicker';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import vi from 'date-fns/locale/vi';
import moment from 'moment';
import { useController } from 'react-hook-form';
import clsx from 'clsx';
import 'react-datepicker/dist/react-datepicker.css';

const CoreDatePicker = (props) => {
   const {
      name,
      control,
      showMonthYearPicker,
      showTimeSelect,
      placeholder,
      dateFormat,
      timeFormat,
      readOnly,
      className,
      legendLabel
   } = props;

   const {
      field: { value, onChange, onBlur },
      fieldState: { error }
   } = useController({
      name,
      control
   });

   const CustomInput = forwardRef(({ value, onClick }, ref) => {
      return (
         <TextField
            fullWidth
            value={
               value && showMonthYearPicker
                  ? moment(value).format('YYYY/MM')
                  : value && showTimeSelect
                  ? moment(value).format('YYYY/MM/DD HH:mm:ss')
                  : value
                  ? moment(value).format('YYYY/MM/DD')
                  : null
            }
            inputProps={{
               readOnly: true
            }}
            InputProps={{
               endAdornment: (
                  <>
                     {value ? (
                        <CancelRoundedIcon onClick={() => onChange(null)} className='cursor-pointer' fontSize='small' />
                     ) : null}
                     <CalendarMonthRoundedIcon className='cursor-pointer' onClick={onClick} fontSize='small' />
                  </>
               )
            }}
            inputRef={ref}
            placeholder={placeholder}
            error={Boolean(error)}
         />
      );
   });

   return (
      <Box
         className={clsx('flex items-center gap-x-20', className)}
         sx={{
            backgroundColor: '#fff',
            '& .react-datepicker': {
               fontSize: '0.8rem',
               '& .react-datepicker__month': {
                  margin: 1
               },
               '& .react-datepicker__current-month': {
                  fontSize: '1.1rem'
               }
            }
         }}>
         {legendLabel ? (
            <Typography variant='h5' component='label'>
               {legendLabel}
            </Typography>
         ) : null}
         <Box sx={{ width: '100%' }}>
            <ReactDatePicker
               locale={vi}
               withPortal
               selected={value}
               onChange={(date) => onChange(date)}
               onCalendarClose={onBlur}
               showTimeSelect={showTimeSelect}
               showMonthYearPicker={showMonthYearPicker}
               dateFormat={dateFormat}
               timeFormat={timeFormat}
               readOnly={readOnly}
               showMonthDropdown
               showYearDropdown
               dropdownMode='select'
               customInput={<CustomInput />}
            />
            {error && error.message ? <FormHelperText error>{error.message}</FormHelperText> : null}
         </Box>
      </Box>
   );
};

export default CoreDatePicker;
