import colorService from '@App/services/color.service';
import sizeService from '@App/services/size.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid } from '@mui/material';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import yupDetail from '../utils/yupProductDetail';
import ControllerSelect from '@Core/Components/FormControl/ControllerSelect';
import ControllerTextField from '@Core/Components/FormControl/ControllerTextField';
import UploadThumbnail from './UploadThumbnail';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import productDetailService from '@App/services/product-detail.service';
import FormLabel from '@Core/Components/FormControl/FormLabel';
import SelectImageDetail from './SelectImageDetail';
import productService from '@App/services/product.service';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import CoreInput from '@Core/Components/Input/CoreInput';

const ListTitle = [
   {
      title: 'Kích thước',
      grid: 2,
      required: true
   },
   {
      title: 'Màu sắc',
      grid: 2,
      required: true
   },
   {
      title: 'Số lượng',
      grid: 2,
      required: true
   },
   {
      title: 'Giá bán',
      grid: 2,
      required: true
   },
   {
      title: 'Sale (%)',
      grid: 2,
      required: false
   },
   {
      title: 'Hình ảnh',
      grid: 2,
      required: true
   }
];

const valueDefault = {
   size_id: '',
   color_id: '',
   quantity: '',
   price: '',
   sale: '',
   image_id: ''
};

function BaseFormProductDetail(props) {
   const { title, product_id } = props;

   const {
      handleSubmit,
      control,
      reset,
      setValue,

      formState: { errors }
   } = useForm({
      mode: 'onSubmit',
      resolver: yupResolver(yupDetail),
      defaultValues: {
         details: [valueDefault]
      }
   });
   console.log(errors);
   const { fields, prepend, append, remove } = useFieldArray({
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

   const [sizes, colors] = useQueries({
      queries: [
         {
            queryKey: ['getSize'],
            queryFn: async () => {
               try {
                  const rest = await sizeService.getAll();
                  return rest.data;
               } catch (error) {
                  errorMessage();
               }
            }
         },
         {
            queryKey: ['getColor'],
            queryFn: async () => {
               try {
                  const rest = await colorService.getAll();
                  return rest.data;
               } catch (error) {
                  errorMessage();
               }
            }
         }
      ]
   });

   const { data: productDetails, refetch: getProductDetail } = useQuery(
      ['getProductDetail', { product_id }],
      async () => {
         const res = await productDetailService.getOne(product_id);
         return res.data;
      },
      {
         onSuccess: (data) => {
            const newData = data.map((item, index) => {
               return {
                  size_id: item.size_id._id,
                  color_id: item.color_id._id,
                  quantity: item.quantity,
                  price: item.price,
                  sale: item.sale || '',
                  image_id: item.image_id._id
               };
            });
            console.log(newData);
            reset({
               details: newData
            });
         }
      }
   );

   const { mutate: deleteProductDetail } = useMutation({
      mutationFn: async (id) => {
         return await productDetailService.deleteProductDetail(id);
      }
   });

   const onSubmit = (data) => {
      console.log(data?.details);
      createProductDetail(data?.details);
   };

   return (
      <>
         <Box>
            <Button type='button' onClick={() => prepend(valueDefault)}>
               Thêm biến thể
            </Button>
         </Box>
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
                     <Grid item xs={12} key={item.id}>
                        <Grid
                           container
                           spacing={1}
                           sx={{
                              boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px;',
                              borderRadius: '10px',
                              padding: '8px 8px 8px 0'
                           }}>
                           <Grid
                              item
                              xs={2}
                              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                              <Box sx={{ height: '60px' }}>
                                 <ControllerSelect
                                    name={`details.${index}.size_id`}
                                    options={sizes?.data || []}
                                    _value='_id'
                                    _title='size_name'
                                    control={control}
                                 />
                              </Box>
                              <Box>
                                 <Button
                                    size='small'
                                    color='error'
                                    sx={{ ml: 2 }}
                                    onClick={() => {
                                       item._id && deleteProductDetail(item._id);
                                       remove(index);
                                    }}>
                                    Xóa
                                 </Button>
                              </Box>
                           </Grid>
                           <Grid item xs={2} sx={{ height: '100px' }}>
                              <ControllerSelect
                                 name={`details.${index}.color_id`}
                                 options={colors?.data || []}
                                 _value='_id'
                                 _title='color_name'
                                 control={control}
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <CoreInput name={`details.${index}.quantity`} control={control} />
                           </Grid>
                           <Grid item xs={2}>
                              <ControllerTextField name={`details.${index}.price`} control={control} />
                           </Grid>
                           <Grid item xs={2}>
                              <ControllerTextField name={`details.${index}.sale`} control={control} />
                           </Grid>
                           <Grid item xs={2} sx={{ height: '110px' }}>
                              <SelectImageDetail name={`details.${index}.image_id`} control={control} />
                           </Grid>
                        </Grid>
                     </Grid>
                  );
               })}
            </Grid>
            <Box>
               <LoadingButton
                  loading={isLoading}
                  loadingPosition='start'
                  variant='contained'
                  startIcon={<SaveIcon />}
                  type='submit'
                  sx={{ mt: 4 }}>
                  {title || 'Thêm mới'}
               </LoadingButton>
            </Box>
         </Box>
      </>
   );
}

export default BaseFormProductDetail;
