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

import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip
} from '@mui/material';
import PropTypes from 'prop-types';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import React, { useCallback, useRef, useState } from 'react';
import { useController } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import { isArray } from 'lodash';
import Image from 'mui-image';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

const CoreInputFile = props => {
    const {
        className,
        control,
        name,
        label,
        placeholder,
        InputLabelProps,
        required,
        helperText,
        isPreview,
        multiple,
        images
    } = props;
    const inputRef = useRef();

    const {
        field: { onChange, value, ref },
        fieldState: { error }
    } = useController({ name, control });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleChange = useCallback(async event => {
        const { files } = event.target;
        if (files) {
            if (multiple) {
                setFile(files);
                const fileList = Object.entries(files).map(file => file[1]);
                onChange(fileList);
            } else {
                setFile(files[0]);
                onChange(files[0]);
                const reader = new FileReader();
                reader.onload = event => {
                    setPreview(event.target.result);
                };
                reader.readAsDataURL(files[0]);
            }
        }
    }, []);

    const getFileName = () => {
        if (value && isArray(value)) {
            return value.map(item => item.name).join(',');
        }
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    return (
        <Box className={className}>
            <>
                <TextField
                    fullWidth
                    label={label}
                    placeholder={placeholder || 'No files are selected!'}
                    value={(multiple ? getFileName() : value?.name) ?? ''}
                    inputRef={ref}
                    error={!!error}
                    helperText={(error && error.message) || helperText || undefined}
                    InputLabelProps={{
                        shrink: placeholder ? true : undefined,
                        required,
                        ...InputLabelProps
                    }}
                    inputProps={{
                        readOnly: true
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton color='primary' onClick={handleClick}>
                                    <BackupRoundedIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <input
                    type='file'
                    multiple={multiple}
                    accept='image/*'
                    ref={inputRef}
                    onChange={handleChange}
                    className='hidden'
                />
            </>
            {isPreview &&
                (multiple && images.length > 0 ? (
                    <Box className='flex gap-x-3'>
                        {images.map((image, i) => (
                            <Box className='mt-3 p-5 border max-w-[33.33333%] bg-[#eee] rounded-md h-auto' key={i}>
                                <Box className='border-4 rounded-sm border-white w-full'>
                                    <Image
                                        src={image}
                                        showLoading={<CircularProgress />}
                                        duration={2000}
                                        easing='ease-in-out'
                                        sx={{ '& > img': { objectFit: 'cover' } }}
                                        height={200}
                                        errorIcon={<ImageNotSupportedIcon fontSize='large' />}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Box className='mt-3 p-5 border max-w-[350px] bg-[#eee] rounded-md h-auto'>
                        <Box className='border-4 rounded-sm border-white w-full'>
                            <Image
                                src={preview ?? value}
                                showLoading={<CircularProgress />}
                                duration={2000}
                                easing='ease-in-out'
                                sx={{ '& > img': { objectFit: 'cover' } }}
                                height={250}
                                errorIcon={<ImageNotSupportedIcon fontSize='large' />}
                            />
                        </Box>
                    </Box>
                ))}
        </Box>
    );
};

CoreInputFile.defaultProps = {
    className: null,
    label: null,
    placeholder: null,
    InputLabelProps: null,
    required: false,
    helperText: null,
    accept: null,
    isPreview: false,
    multiple: false,
    images: []
};
CoreInputFile.propTypes = {
    className: PropTypes.string,
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    InputLabelProps: PropTypes.object,
    required: PropTypes.bool,
    helperText: PropTypes.string,
    accept: PropTypes.string,
    isPreview: PropTypes.bool,
    multiple: PropTypes.bool
};

export default React.memo(CoreInputFile);
