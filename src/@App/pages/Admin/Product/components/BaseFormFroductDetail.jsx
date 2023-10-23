import React from 'react';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useQueries } from '@tanstack/react-query';
import { Box, Container, Grid } from '@mui/material';

import sizeService from '@App/services/size.service';
import colorService from '@App/services/color.service';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import SelectMultipleImageProductDetail from './SelectMultipleImageProductDetail';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';

function BaseFormProductDetail(props) {
    const { form, onSubmit } = props;
    const { handleSubmit, control, setValue } = form;

    const results = useQueries({
        queries: [
            {
                queryKey: ['size'],
                queryFn: async () => {
                    const rest = await sizeService.getAll();
                    return rest.data;
                }
            },
            {
                queryKey: ['color'],
                queryFn: async () => {
                    const rest = await colorService.getAll();
                    return rest.data;
                }
            }
        ]
    });

    return (
        <Container maxWidth='lg'>
            <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} sx={{ minHeight: '120px' }}>
                                <FormLabel title='Kích thước' required gutterBottom />
                                <ControllerSelect
                                    name='size_id'
                                    control={control}
                                    options={results[0]?.data}
                                    _title='size_name'
                                    _value='_id'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ minHeight: '120px' }}>
                                <FormLabel title='Màu sắc' required gutterBottom />
                                <ControllerSelect
                                    name='color_id'
                                    control={control}
                                    options={results[1]?.data}
                                    _title='color_name'
                                    _value='_id'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ minHeight: '120px' }}>
                                <FormLabel title='Số lượng' required gutterBottom />
                                <ControllerTextField name='quantity' control={control} />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ minHeight: '120px' }}></Grid>
                            <Grid item xs={12} md={6} sx={{ minHeight: '120px' }}>
                                <FormLabel title='Giá bán' required gutterBottom />
                                <ControllerTextField name='price' control={control} />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ minHeight: '120px' }}>
                                <FormLabel title='Giá khuyến mại' required gutterBottom />
                                <ControllerTextField name='sale' control={control} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormLabel title='Hình ảnh' required gutterBottom />
                        <SelectMultipleImageProductDetail name='image_id' setValue={setValue} control={control} />
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingButton
                            loading={props.loading}
                            loadingPosition='start'
                            variant='contained'
                            startIcon={<SaveIcon />}
                            type='submit'>
                            {props.title || 'Thêm mới'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default BaseFormProductDetail;
