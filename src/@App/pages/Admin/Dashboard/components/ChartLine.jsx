import statisticService from '@App/services/statistic.service';
import { Typography } from '@mui/material';
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
         initialData: []
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
         enabled: false,
         inputEnabled: false,
         buttonSpacing: 25,
         buttonTheme: {
            states: {
               select: {
                  fill: 'white',
                  style: {
                     color: '#333',
                     fontWeight: 'bold',
                     textDecoration: 'underline'
                  }
               }
            },
            fill: 'white',
            style: {
               color: 'black',
               fontSize: '18px',
               textDecoration: 'none'
            }
         },

         buttons: [
            {
               type: 'day',
               count: 1,
               text: '1D'
            },
            {
               type: 'day',
               count: 5,
               text: '5D'
            },
            {
               type: 'month',
               count: 1,
               text: '1M'
            },
            {
               type: 'month',
               count: 6,
               text: '6M'
            },
            {
               type: 'ytd',
               count: 1,
               text: 'YTD'
            },
            {
               type: 'year',
               count: 1,
               text: '1Y'
            },
            {
               type: 'year',
               count: 5,
               text: '5Y'
            },
            {
               type: 'all',
               text: 'MAX'
            }
         ],
         selected: 1
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
         height: 400
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
               valueDecimals: 2,
               headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
            }
         }
      ]
   };
   return (
      <div>
         <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
         <Typography textAlign='center'>Biểu đồ thống kê doanh số</Typography>
      </div>
   );
}

export default ChartLine;
