import { Box } from '@mui/material';
import React from 'react';
import FilterAction from './FilterAction';

const status = ['Limited Edition', 'Online Only', 'Sale off'];

const DESIGNS = ['Low Top', 'High Top', 'Mid Top', 'Mule'];

function Filter() {
   return (
      <Box>
         <FilterAction title='TRẠNG THÁI' data={status} />
         <FilterAction title='KIỂU DÁNG' data={DESIGNS} />
      </Box>
   );
}

export default React.memo(Filter);
