import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import yupDetail from '../utils/yupProductDetail';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import productDetailService from '@App/services/product-detail.service';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import SelectImageDetail from './SelectImageDetail';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import { ListTitle } from '../utils';

const valueDefault = {
   size_id: '',
   color_id: '',
   quantity: '',
   price: '',
   sale: '',
   image_id: ''
};

function BaseFormProductDetail(props) {
   const { title, product_id, isChangeImages, sizes, colors } = props;
   const [rerender, setRerender] = useState(false);
   const {
      handleSubmit,
      control,
      reset,
      watch,
      setError,
      clearErrors,
      formState: { errors }
   } = useForm({
      mode: 'onSubmit',
      resolver: yupResolver(yupDetail),
      defaultValues: {
         details: [valueDefault]
      }
   });
   const { fields, append, remove } = useFieldArray({
      control,
      name: 'details'
   });

   const { isLoading, mutate: createProductDetail } = useMutation({
      mutationFn: async (data) => {
         const newData = data.map((item) => ({ ...item, product_id }));
         return await productDetailService.createProductDetail(newData);
      },
      onSuccess: (data) => {
         getProductDetail();
         successMessage(data.message);
      },
      onError: (error) => {
         errorMessage(error);
      }
   });
   const { mutate: updateProductDetail } = useMutation({
      mutationFn: async (data) => {
         const newData = data.map((item) => ({ ...item, product_id }));
         return await productDetailService.updateProductDetail(newData);
      },
      onSuccess: (data) => {
         getProductDetail();
         successMessage(data.message);
      },
      onError: (error) => {
         errorMessage(error);
      }
   });

   const { refetch: getProductDetail } = useQuery(
      ['getProductDetail', { product_id }],
      async () => {
         const res = await productDetailService.getOne(product_id);
         return res.data;
      },
      {
         onSuccess: (data) => {
            const newData = data.map((item) => {
               return {
                  _id: item._id,
                  size_id: item.size_id._id,
                  color_id: item.color_id._id,
                  quantity: item.quantity,
                  price: item.price,
                  sale: item.sale || '',
                  image_id: item.image_id._id
               };
            });

            reset({
               details: newData.length > 0 ? newData : [valueDefault]
            });
         }
      }
   );

   const { mutate: deleteProductDetail } = useMutation({
      mutationFn: async (id) => {
         return await productDetailService.deleteProductDetail(id);
      }
   });

   const seen = new Set();
   const calcColor = (originDetails) => {
      for (let i = 0; i < originDetails.length; i++) {
         const { color_id, size_id } = originDetails[i];

         const key = `${color_id}-${size_id}`;
         if (seen.has(key)) {
            setError(`details.${i}.size_id`, { message: 'Trùng màu và size' });
            setError(`details.${i}.color_id`, { message: 'Trùng màu và size' });
         } else {
            clearErrors(`details.${i}.size_id`);
            clearErrors(`details.${i}.color_id`);
         }
         seen.add(key);
      }
   };

   const onSubmit = (data) => {
      calcColor(data.details);
      if (errors?.details) {
         return;
      }
      // /update-detail
      if (product_id) {
         updateProductDetail(data?.details);
         return;
      }
      createProductDetail(data?.details);
   };

   const handleGetColor = (value) => {
      setRerender((prev) => !prev);
   };

   const originDetails = watch('details');
   useEffect(() => {
      calcColor(originDetails);
   }, [rerender]);

   return (
      <>
         <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
               {ListTitle.map((label, index) => {
                  return (
                     <Grid item xs={label.grid} key={index} mt={4}>
                        <FormLabel required={label.required} title={label.title} name='color_id' />
                     </Grid>
                  );
               })}

               {fields.map((item, index) => {
                  return (
                     <Grid item xs={12} key={index}>
                        <Grid
                           container
                           spacing={1}
                           sx={{
                              boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px;',
                              borderRadius: '10px',
                              paddingRight: '8px'
                           }}>
                           <Grid
                              item
                              xs={2}
                              sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 justifyContent: 'space-between'
                              }}>
                              <Box sx={{ height: '60px' }}>
                                 <ControllerSelect
                                    getChangeValue={handleGetColor}
                                    name={`details.${index}.size_id`}
                                    options={item._id ? sizes || [] : sizes}
                                    _value='_id'
                                    _title='size_name'
                                    control={control}
                                    disabled={Boolean(item._id)}
                                 />
                              </Box>
                              <Box>
                                 <Button
                                    size='small'
                                    color='error'
                                    sx={{ mb: '4px' }}
                                    onClick={() => {
                                       deleteProductDetail(item._id);
                                       remove(index);
                                    }}>
                                    Xóa
                                 </Button>
                              </Box>
                           </Grid>
                           <Grid item xs={2} sx={{ height: '100px' }}>
                              <ControllerSelect
                                 getChangeValue={handleGetColor}
                                 name={`details.${index}.color_id`}
                                 options={item._id ? colors || [] : colors}
                                 _value='_id'
                                 _title='color_name'
                                 control={control}
                                 disabled={Boolean(item._id)}
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <ControllerTextField name={`details.${index}.quantity`} control={control} />
                           </Grid>
                           <Grid item xs={2}>
                              <ControllerTextField name={`details.${index}.price`} control={control} />
                           </Grid>
                           <Grid item xs={2}>
                              <ControllerTextField name={`details.${index}.sale`} control={control} />
                           </Grid>
                           <Grid item xs={2} sx={{ height: '70px' }}>
                              <SelectImageDetail
                                 isChangeImages={isChangeImages}
                                 name={`details.${index}.image_id`}
                                 control={control}
                              />
                           </Grid>
                        </Grid>
                     </Grid>
                  );
               })}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
               <Button onClick={() => append(valueDefault)}>Thêm biến thể mới</Button>
               <LoadingButton
                  loading={isLoading}
                  loadingPosition='start'
                  variant='contained'
                  startIcon={<SaveIcon />}
                  type='submit'
                  sx={{ mt: 4 }}>
                  {title || 'Lưu biến thể'}
               </LoadingButton>
            </Box>
         </Box>
      </>
   );
}

export default React.memo(BaseFormProductDetail);
