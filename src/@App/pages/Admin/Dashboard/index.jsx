import BasicPage from '@App/components/customs/BasicPage';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
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
import CoreDatePicker from '@Core/Components/Input/CoreDatePicker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from 'moment';
function Dashboard() {
   const { control, watch } = useForm({
      mode: 'onChange',
      defaultValues: {
         startDate: new Date('2023/01/01'),
         endDate: new Date()
      },
      resolver: yupResolver(
         Yup.object().shape({
            startDate: Yup.string()
               .notOneOf([Yup.ref('endDate')], 'error not one of')
               .required(),
            endDate: Yup.date()
               .notOneOf([Yup.ref('startDate')], 'error not one of')
               .when(
                  'startDate',
                  (publishStart, schema) => new Date(publishStart) && schema.min(new Date(publishStart))
               )
               .required()
         })
      )
   });

   const startDate = watch('startDate');
   const endDate = watch('endDate');

   const { data } = useQuery(
      ['get-revenue', startDate, endDate],
      async () => {
         const start = moment(startDate, 'LLLL').startOf('day').format('YYYY-MM-DD HH:mm');
         const end = moment(endDate, 'LLLL').endOf('day').format('YYYY-MM-DD HH:mm');
         const res = await statisticService.getRevenue({ params: { start, end } });
         return res;
      },
      {
         initialData: { total_money: 0, total_quantity: 0, total_user: 0, total_bill: 0 }
      }
   );
   return (
      <BasicPage currentPage='Thống kê' sx={{ backgroundColor: '#f5f6f7' }} paperProps={{ elevation: 0 }}>
         <Grid container spacing={4}>
            <Grid item xs={12}>
               <Box>
                  <Typography>Chọn thời gian</Typography>
                  <Stack component='form' direction='row' gap={2}>
                     <CoreDatePicker control={control} placeholder='Từ ngày' name='startDate' />
                     <CoreDatePicker control={control} placeholder='Đến ngày' name='endDate' />
                  </Stack>
               </Box>
            </Grid>
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
               <ChartColumn startDate={startDate} endDate={endDate} />
            </Grid>
            <Grid item xs={6}>
               <ChartPie startDate={startDate} endDate={endDate} />
            </Grid>

            <Grid item xs={12}>
               <ChartLine />
            </Grid>
         </Grid>
      </BasicPage>
   );
}

export default Dashboard;
