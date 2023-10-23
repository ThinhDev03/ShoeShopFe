import {
    Box,
    Button,
    FormControlLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import AccordionDescription from './AccordionDescription';
import { useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import productDetail from '@App/services/product-detail.service';
import productService from '@App/services/product.service';
import colorService from '@App/services/color.service';
import sizeService from '@App/services/size.service';

function ProductDescription() {
    const { id } = useParams();
    const [activeProductDetail, setActiveProductDetail] = useState(0);

    const results = useQueries({
        queries: [
            {
                queryKey: ['getProduct'],
                queryFn: async () => {
                    const rest = await productService.getOne(id);
                    return rest.data;
                }
            },
            {
                queryKey: ['getProductDetai'],
                queryFn: async () => {
                    const rest = await productDetail.getOne(id);
                    return rest.data;
                }
            },
            {
                queryKey: ['getColor'],
                queryFn: async () => {
                    const rest = await colorService.getAll();
                    return rest.data;
                }
            },
            {
                queryKey: ['getSize'],
                queryFn: async () => {
                    const rest = await sizeService.getAll();
                    return rest.data;
                }
            }
        ]
    });

    console.log(results[1]);

    return (
        <React.Fragment>
            <Stack sx={{ padding: '0 24px', gap: '30px' }}>
                <Typography variant='h5'>{!results[0].isLoading && results[0]?.data?.name}</Typography>
                <Stack flexDirection='row' justifyContent='space-between'>
                    <Box sx={{ display: 'flex', gap: 2, fontSize: '18px' }}>
                        Mã sản phẩm:
                        <strong>AV00180</strong>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, fontSize: '18px' }}>
                        Tình trạng:
                        <strong>New Arrival</strong>
                    </Box>
                </Stack>
                <Typography variant='h5' sx={({ palette }) => ({ color: palette.education.text.main, fontWeight: 600 })}>
                    {/* {(!results.isLoading && results[1]?.data?.[activeProductDetail].price) || ''}
                {(!results.isLoading && results[1]?.data?.[activeProductDetail].sale) || ''} */}
                </Typography>
                <Box sx={{ borderTop: '1px dashed #333' }}></Box>
                <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    defaultValue='female'
                    name='radio-buttons-group'
                    sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    {!results.isLoading &&
                        results[2]?.data?.map((color, index) => {
                            return (
                                <FormControlLabel
                                    value='female'
                                    control={<Radio />}
                                    label={color.color_name}
                                    key={color._id}
                                    checked={index === activeProductDetail}
                                    onChange={() => setActiveProductDetail(index)}
                                />
                            );
                        })}
                </RadioGroup>
                <Box sx={{ borderTop: '1px dashed #333' }}></Box>
                <Stack flexDirection='row' alignItems='center' gap={2}>
                    <Box sx={{ width: '50%' }}>
                        <Typography sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Size</Typography>
                        <Select fullWidth>
                            {!results.isLoading &&
                                results[3]?.data?.map((size, index) => {
                                    return (
                                        <MenuItem value={size._id} key={size._id}>
                                            {size.size_name}
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                    </Box>
                    <Box sx={{ width: '50%', mt: 0 }}>
                        <Typography sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Số lượng</Typography>
                        <TextField />
                    </Box>
                </Stack>
                <Stack gap={1}>
                    <Button
                        fullWidth
                        sx={({ palette }) => ({
                            textTransform: 'uppercase',
                            py: '18px',
                            bgcolor: palette.education.text.black,
                            ':hover': {
                                bgcolor: palette.education.text.black
                            }
                        })}>
                        Thêm vào giỏ hàng
                    </Button>
                    <Button fullWidth sx={{ textTransform: 'uppercase', py: '18px' }}>
                        Thanh toán
                    </Button>
                </Stack>
                <AccordionDescription />
            </Stack>
        </React.Fragment>
    );
}

export default React.memo(ProductDescription);
