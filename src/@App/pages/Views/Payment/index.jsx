import useQueryParams from '@App/hooks/useQueryParams';
import paymentService from '@App/services/payment.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Payment() {
   const params = useQueryParams();
   const navigate = useNavigate();
   console.log(params);
   useQuery(
      ['payment', params],
      async () => {
         const res = await paymentService.savePayment(params);
         console.log(res);
         return res;
      },
      {
         onSuccess(data) {
            console.log(data);
         },
         onError(err) {
            console.log(err);
         }
      }
   );
   return <div></div>;
}

export default Payment;
