import useQueryParams from '@App/hooks/useQueryParams';
import paymentService from '@App/services/payment.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Payment() {
   const params = useQueryParams();
   const navigate = useNavigate();
   useQuery(
      ['payment', params],
      async () => {
         const res = await paymentService.savePayment(params);
         return res;
      },
      {
         onSuccess(data) {
            navigate('/bill');
         },
         onError(err) {
            navigate('/');
         }
      }
   );
   return <></>;
}

export default Payment;
