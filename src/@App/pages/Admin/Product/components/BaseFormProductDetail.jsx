import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useFieldArray } from 'react-hook-form';
import { useQueries } from '@tanstack/react-query';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import sizeService from '@App/services/size.service';
import colorService from '@App/services/color.service';
import yupProductDetail from '../utils/yupProductDetail';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import SelectMultipleImageProductDetail from './SelectMultipleImageProductDetail';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';

function BaseFormProductDetail(props) {
   const { form, onSubmit } = props;
   const { handleSubmit, control, setValue } = form;

   const [expanded, setExpanded] = useState(false);

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   const { fields, append, remove } = useFieldArray({
      control,
      name: 'name'
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

   return (
      <Container maxWidth='lg'>
         <Button sx={{ mb: 4 }} onClick={() => append(yupProductDetail.getDefault())}>
            Thêm biến thể
         </Button>

         <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            {fields.map((item, index) => {
               return (
                  <Accordion
                     expanded={expanded === `panel${index + 1}`}
                     onChange={handleChange(`panel${index + 1}`)}
                     sx={{
                        ':before': {
                           opacity: 0
                        },
                        mb: 5,
                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                        borderRadius: '10px !important'
                     }}
                     key={index}>
                     <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index + 1}bh-content`}
                        id={`panel${index + 1}bh-header`}>
                        <Box
                           sx={{
                              width: '90%',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                           }}>
                           <Typography sx={{ fontSize: '16px !important', color: 'text.secondary' }}>
                              Biến thể {index + 1}
                           </Typography>
                           <Button onClick={() => remove(index)}>Xóa</Button>
                        </Box>
                     </AccordionSummary>
                     <AccordionDetails>
                        <Grid container spacing={3} sx={{ mb: 10 }}>
                           <Grid item xs={12} md={8}>
                              <Grid container spacing={2}>
                                 <Grid item xs={12} md={6} sx={{ minHeight: '120px' }}>
                                    <FormLabel title='Kích thước' required gutterBottom />
                                    <ControllerSelect
                                       name={`variation.${index}.size_id`}
                                       control={control}
                                       options={results[0]?.data}
                                       _title='size_name'
                                       _value='_id'
                                    />
                                 </Grid>

                                 <Grid item xs={12} md={6} sx={{ minHeight: '120px' }}>
                                    <FormLabel title='Màu sắc' required gutterBottom />
                                    <ControllerSelect
                                       name={`variation.${index}.color_id`}
                                       control={control}
                                       options={results[1]?.data}
                                       _title='color_name'
                                       _value='_id'
                                    />
                                 </Grid>

                                 <Grid item xs={12} md={6} sx={{ minHeight: '120px' }}>
                                    <FormLabel title='Số lượng' required gutterBottom />
                                    <ControllerTextField name={`variation.${index}.quantity`} control={control} />
                                 </Grid>

                                 <Grid item xs={12} md={6} sx={{ minHeight: '120px' }}></Grid>

                                 <Grid item xs={12} md={6} sx={{ minHeight: '120px' }}>
                                    <FormLabel title='Giá bán' required gutterBottom />
                                    <ControllerTextField name={`variation.${index}.price`} control={control} />
                                 </Grid>

                                 <Grid item xs={12} md={6} sx={{ minHeight: '120px' }}>
                                    <FormLabel title='Giá khuyến mại' gutterBottom />
                                    <ControllerTextField name={`variation.${index}.sale`} control={control} />
                                 </Grid>
                              </Grid>
                           </Grid>

                           <Grid item xs={12} md={4}>
                              <FormLabel title='Hình ảnh' required gutterBottom />
                              <SelectMultipleImageProductDetail
                                 name={`variation.${index}.image_id`}
                                 setValue={setValue}
                                 control={control}
                              />
                           </Grid>
                        </Grid>
                     </AccordionDetails>
                  </Accordion>
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
                     {props.title || 'Thêm mới'}
                  </LoadingButton>
               </Grid>
            </Grid>
         </Box>
      </Container>
   );
}

export default BaseFormProductDetail;
