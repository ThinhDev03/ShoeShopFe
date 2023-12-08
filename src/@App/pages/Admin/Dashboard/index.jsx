import BasicPage from '@App/components/customs/BasicPage';
import { Grid } from '@mui/material';
import React from 'react';
import ChartPie from './components/ChartPie';
import ChartLine from './components/ChartLine';
import WidgetSummary from './components/WidgetSummary';
import img1 from '@App/assets/glass/ic_glass_bag.png';
import img2 from '@App/assets/glass/ic_glass_users.png';
import img3 from '@App/assets/glass/ic_glass_buy.png';
import img4 from '@App/assets/glass/ic_glass_message.png';
import statisticService from '@App/services/statistic.service';
import { useQuery } from '@tanstack/react-query';
import ChartColumn from './components/ChartColumn';

function Dashboard() {
   const { data } = useQuery(
      ['get-revenue'],
      async () => {
         const res = await statisticService.getRevenue();
         return res;
      },
      {
         initialData: { total_money: 0, total_quantity: 0, total_user: 0, total_bill: 0 }
      }
   );
   return (
      <BasicPage currentPage='Thống kê' sx={{ backgroundColor: '#f5f6f7' }} paperProps={{ elevation: 0 }}>
         <Grid container spacing={4}>
            <Grid item xs={3}>
               <WidgetSummary
                  title='Doanh số'
                  total={data.total_money}
                  color='success'
                  icon={<img alt='icon' src={img1} />}
               />
            </Grid>
            <Grid item xs={3}>
               <WidgetSummary
                  title='Người dùng'
                  total={data.total_user}
                  color='success'
                  icon={<img alt='icon' src={img2} />}
               />
            </Grid>
            <Grid item xs={3}>
               <WidgetSummary
                  title='Sản phẩm đã bán'
                  total={data.total_quantity}
                  color='success'
                  icon={<img alt='icon' src={img3} />}
               />
            </Grid>
            <Grid item xs={3}>
               <WidgetSummary
                  title='Tổng đơn hàng'
                  total={data.total_bill}
                  color='success'
                  icon={<img alt='icon' src={img4} />}
               />
            </Grid>

            <Grid item xs={6}>
               <ChartColumn />
            </Grid>

            <Grid item xs={6}>
               <ChartPie />
            </Grid>
            
            <Grid item xs={12}>
               <ChartLine />
            </Grid>
         </Grid>
      </BasicPage>
   );
}

export default Dashboard;
