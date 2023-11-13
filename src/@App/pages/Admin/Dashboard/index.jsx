import BasicPage from '@App/components/customs/BasicPage';
import { Grid } from '@mui/material';
import React from 'react';
import ChartPie from './components/ChartPie';
import ChartLine from './components/ChartLine';

function Dashboard() {
   return (
      <BasicPage currentPage='Thống kê'>
         <Grid container spacing={4}>
            <Grid item xs={6}>
               <ChartLine />
            </Grid>
            <Grid item xs={6}>
               <ChartPie />
            </Grid>
         </Grid>
      </BasicPage>
   );
}

export default Dashboard;
