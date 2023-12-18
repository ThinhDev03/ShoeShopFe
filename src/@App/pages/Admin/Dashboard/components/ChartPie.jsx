import React, { useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import statisticService from '@App/services/statistic.service';
import '../index.css';
import moment from 'moment';

function ChartPie({ startDate, endDate }) {
   const start = moment(startDate, 'LLLL').startOf('day').format('YYYY-MM-DD HH:mm');
   const end = moment(endDate, 'LLLL').endOf('day').format('YYYY-MM-DD HH:mm');

   const { data } = useQuery(
      ['get-best-seller', start, end],
      async () => {
         const res = await statisticService.getBestSeller({ params: { start, end } });
         const newData = res.data.map((item, index) => {
            if (index === 1) {
               return { name: item.product_name, y: item.quantity, sliced: true, selected: true };
            }
            return { name: item.product_name, y: item.quantity };
         });
         return newData;
      },
      {
         initialData: [],
         staleTime: 0,
         cacheTime: 0
      }
   );
   const options = {
      accessibility: {
         enabled: false
      },
      navigator: {
         enabled: false
      },
      scrollbar: {
         enabled: false
      },

      rangeSelector: {
         enabled: false
      },

      series: [
         {
            name: 'Đã bán',
            colorByPoint: true,
            data: data
         }
      ],
      plotOptions: {
         series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [
               {
                  enabled: true,
                  distance: 20
               },
               {
                  enabled: true,
                  distance: -40,
                  format: '{point.percentage:.1f}%',
                  style: {
                     fontSize: '1.2em',
                     textOutline: 'none',
                     opacity: 0.7
                  },
                  filter: {
                     operator: '>',
                     property: 'percentage',
                     value: 10
                  }
               }
            ]
         }
      },
      summarized: false,
      drilldown: {
         series: [
            {
               name: 'Other',
               id: 'other',
               data: [
                  {
                     name: '1',
                     y: 13,
                     color: '#7DA7D9',
                     visible: true,
                     sliced: false,
                     selected: false
                  },
                  {
                     name: '2',
                     y: 19,
                     color: '#C74542',
                     visible: true,
                     sliced: false,
                     selected: false
                  }
               ]
            }
         ]
      },
      boost: {
         enabled: false
      },
      chart: {
         type: 'pie',
         height: 380
      }
   };
   return (
      <Paper sx={{ borderRadius: 2, overflow: 'hidden', padding: '10px' }}>
         <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />

         <Typography mt={4} textAli gn='center'>
            Biểu đồ thống kê sản phẩm bán chạy
         </Typography>
      </Paper>
   );
}

export default ChartPie;
