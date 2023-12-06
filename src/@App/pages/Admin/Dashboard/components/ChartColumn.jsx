import React, { useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import statisticService from '@App/services/statistic.service';
import '../index.css';

function ChartColumn() {
   const { data } = useQuery(
      ['get-top-rate'],
      async () => {
         const res = await statisticService.getTopRate();
         const category = [];
         const newData = res.data.map((item, index) => {
            category.push(item.product_name);
            if (index === 1) {
               return {
                  name: item.product_name,
                  y: parseFloat(item.rate.toFixed(1)),
                  sliced: true,
                  selected: true,
                  drilldown: item.product_name
               };
            }
            return { name: item.product_name, y: parseFloat(item.rate.toFixed(1)), drilldown: item.product_name };
         });
         return {
            data: newData,
            category
         };
      },
      {
         initialData: { data: [] }
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
            name: 'Đánh giá sao',
            colorByPoint: true,
            data: data.data
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
      xAxis: {
         categories: data.category,
         crosshair: true,
         accessibility: {
            description: 'Countries'
         }
      },
      boost: {
         enabled: false
      },
      chart: {
         type: 'column',
         height: 380,
         events: {
            drillup: function (e) {}
         }
      }
   };
   return (
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
         <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />

         <Typography mt={4} textAlign='center'>
            Biểu đồ thống kê sản phẩm có đánh giá cao
         </Typography>
         
      </Paper>
   );
}

export default ChartColumn;
