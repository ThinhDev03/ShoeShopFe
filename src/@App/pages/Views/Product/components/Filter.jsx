import { Box } from '@mui/material';
import React from 'react';
import FilterAction from './FilterAction';
import { useQueries } from '@tanstack/react-query';
import categoryService from '@App/services/category.service';
import brandService from '@App/services/brand.service';
import SearchProduct from './SearchProduct';

function Filter({ form, brand, category }) {
   const { control, setValue } = form;
   const [categoryData, brandData] = useQueries({
      queries: [
         {
            queryKey: ['category'],
            queryFn: async () => {
               const rest = await categoryService.getAll();
               return rest.data;
            }
         },
         {
            queryKey: ['brand'],
            queryFn: async () => {
               const rest = await brandService.getAll();
               return rest.data;
            }
         }
      ]
   });

   return (
      <Box sx={{ position: 'sticky', top: 230 }}>
         <SearchProduct control={control} />
         <FilterAction
            setValue={setValue}
            title='DANH MỤC'
            data={categoryData}
            pathName='category'
            pathLabel='category_name'
            pathKey='_id'
            currentValue={category}
            control={control}
         />
         <FilterAction
            currentValue={brand}
            setValue={setValue}
            title='THƯƠNG HIỆU'
            data={brandData}
            pathName='brand'
            pathLabel='brand_name'
            pathKey='_id'
            control={control}
         />
      </Box>
   );
}

export default Filter;
