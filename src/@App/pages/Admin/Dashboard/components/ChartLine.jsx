import statisticService from '@App/services/statistic.service';
import { Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';

import React from 'react';

function ChartLine() {
   const { data } = useQuery(
      ['get-revenue-all'],
      async () => {
         const res = await statisticService.getRevenueAll();
         return res.data;
      },
      {
         initialData: [],
         staleTime: 0,
         cacheTime: 0
      }
   );

   const options = {
      navigator: {
         enabled: false
      },
      scrollbar: {
         enabled: false
      },
      xAxis: {
         type: 'datetime',
         tickInterval: 7 * 24 * 3600 * 1000 * 4
      },

      rangeSelector: {
         enabled: false
      },
      plotOptions: {
         series: {
            showInNavigator: true,
            gapSize: 6
         }
      },
      yAxis: [
         {
            opposite: false,
            offset: 75,
            labels: {
               x: 0,
               style: {
                  color: '#00AB55',
                  position: 'absolute',
                  fontSize: '18px'
               },
               align: 'left'
            }
         }
      ],
      chart: {
         height: 380
      },
      series: [
         {
            name: 'doanh số',
            type: 'line',
            lineWidth: 2,
            color: '#00AB55',
            connectNulls: true,
            marker: {
               symbol: 'diamond'
            },
            data: data,
            pointInterval: 24 * 3600 * 1000,
            tooltip: {
               valueDecimals: 0,
               headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
            }
         }
      ]
   };
   return (
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
         <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
         <Typography mt={4} textAlign='center'>
            Biểu đồ thống kê doanh số
         </Typography>
      </Paper>
   );
}

export default ChartLine;
