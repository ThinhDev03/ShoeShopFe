import { Box } from '@mui/material';
import React from 'react';
import FilterAction from './FilterAction';
import { useQueries } from '@tanstack/react-query';
import categoryService from '@App/services/category.service';
import brandService from '@App/services/brand.service';
import SearchProduct from './SearchProduct';

const status = ['Limited Edition', 'Online Only', 'Sale off'];

const DESIGNS = ['Low Top', 'High Top', 'Mid Top', 'Mule'];

function Filter() {
   const results = useQueries({
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
      <Box>
         <SearchProduct />
         <FilterAction
            title='TRẠNG THÁI'
            data={results[0]}
            _title='category_name'
            _id='_id'
            loading={results[0].isFetching}
         />
         <FilterAction
            title='KIỂU DÁNG'
            data={results[1]}
            _title='brand_name'
            _id='_id'
            loading={results[1].isFetching}
         />
      </Box>
   );
}

export default React.memo(Filter);
