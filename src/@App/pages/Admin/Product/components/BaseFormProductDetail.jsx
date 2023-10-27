import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useFieldArray } from 'react-hook-form';
import { useQueries } from '@tanstack/react-query';
import { Box, Button, Grid } from '@mui/material';

import sizeService from '@App/services/size.service';
import colorService from '@App/services/color.service';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import SelectMultipleImageProductDetail from './SelectMultipleImageProductDetail';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import yupDetail from '../utils/yupProductDetail';

const listLabel = [
   { label: 'Kích thước', required: true },
   { label: 'Màu sắc', required: true },
   { label: 'Số lượng', required: true },
   { label: 'Giá bán', required: true },
   { label: 'Phầm trăm khuyến mại', required: false },
   { label: 'hình ảnh', required: true }
];

function BaseFormProductDetail(props) {
   const { form, onSubmit } = props;
   const { handleSubmit, control, setValue, getValues } = form;

   const { fields, append, prepend, remove } = useFieldArray({
      control,
      name: 'details'
   });

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

   const onClickCoppyProductDetail = (index) => {
      const multipleValues = getValues([
         `details.${index}.size_id`,
         `details.${index}.color_id`,
         `details.${index}.quantity`,
         `details.${index}.price`,
         `details.${index}.sale`,
         `details.${index}.image_i`
      ]);
      const value = multipleValues?.filter((value) => value === undefined);

      if (value) {
         prepend({
            size_id: '',
            color_id: '',
            quantity: '',
            price: '',
            sale: '',
            image_id: ''
         });
      }
   };

   return (
      <React.Fragment>
         <Button
            sx={{ my: 3 }}
            onClick={() =>
               prepend({
                  size_id: '',
                  color_id: '',
                  quantity: '',
                  price: '',
                  sale: '',
                  image_id: ''
               })
            }>
            Thêm biến thể
         </Button>
         <Grid container spacing={2} justifyContent='center' alignItems='center'>
            {listLabel.map((label, index) => {
               return (
                  <Grid item xs={12} md={2} key={index}>
                     <FormLabel title={label.label} required={label.required} gutterBottom />
                  </Grid>
               );
            })}
         </Grid>
         <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            {fields.map((item, index) => {
               return (
                  <Box py={2} key={index}>
                     <Grid
                        container
                        spacing={1}
                        sx={{ borderRadius: 1, mb: 1, boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px;' }}>
                        <Grid
                           item
                           xs={12}
                           md={2}
                           sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                           <Box minHeight={70}>
                              <ControllerSelect
                                 name={`details.${index}.size_id`}
                                 control={control}
                                 options={results[0]?.data}
                                 _title='size_name'
                                 _value='_id'
                              />
                           </Box>
                           <Grid item sx={{ padding: '0px !important', display: 'flex', gap: 1, mb: 1 }}>
                              <Button size='small' onClick={() => onClickCoppyProductDetail(index)}>
                                 Sao chép
                              </Button>
                              {index !== 0 && (
                                 <Button size='small' color='error' onClick={() => remove(index)}>
                                    Xóa
                                 </Button>
                              )}
                           </Grid>
                        </Grid>

                        <Grid item xs={12} md={2} minHeight={80}>
                           <Box minHeight={70}>
                              <ControllerSelect
                                 name={`details.${index}.color_id`}
                                 control={control}
                                 options={results[1]?.data}
                                 _title='color_name'
                                 _value='_id'
                              />
                           </Box>
                        </Grid>

                        <Grid item xs={12} md={2} minHeight={80}>
                           <ControllerTextField name={`details.${index}.quantity`} control={control} />
                        </Grid>

                        <Grid item xs={12} md={2} minHeight={80}>
                           <ControllerTextField name={`details.${index}.price`} control={control} />
                        </Grid>

                        <Grid item xs={12} md={2} minHeight={80}>
                           <ControllerTextField name={`details.${index}.sale`} control={control} />
                        </Grid>

                        <Grid item xs={12} md={2} minHeight={130}>
                           <Box sx={{ height: '100px', width: '100%', pr: 1 }}>
                              <SelectMultipleImageProductDetail
                                 name={`details.${index}.image_id`}
                                 setValue={setValue}
                                 control={control}
                              />
                           </Box>
                        </Grid>
                     </Grid>
                  </Box>
               );
            })}

            <Grid container>
               <Grid item xs={12}>
                  <LoadingButton
                     loading={props.loading}
                     loadingPosition='start'
                     variant='contained'
                     startIcon={<SaveIcon />}
                     type='submit'>
                     {props.title || 'Tạo mới biến thể'}
                  </LoadingButton>
               </Grid>
            </Grid>
         </Box>
      </React.Fragment>
   );
}

export default BaseFormProductDetail;
