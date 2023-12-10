import axios from 'axios';

const baseUrlProvince = 'https://provinces.open-api.vn/api/';

export const getProvinces = async () => {
   const response = await axios.get(baseUrlProvince + '?depth=2');
   return response.data;
};
export const getDistricts = async (provinces_code) => {
   const response = await axios.get(baseUrlProvince + `p/${provinces_code}?depth=2`);
   return response.data.districts;
};

export const getWards = async (districts_code) => {
   const response = await axios.get(`${baseUrlProvince}d/${districts_code}?depth=2`);
   return response.data.wards;
};

export const payment_methods = [
   {
      label: 'Thanh toán trực tiếp khi giao hàng',
      value: 'PAYMENT_ON_DELIVEY'
   },
   {
      label: 'Thanh toán bằng cổng giao dịch VN PAY',
      value: 'PAYMENT_IN_ADVANCE'
   }
];

export const bankCode = [
   {
      label: 'Ngân hàng Quốc Dân - NCB',
      value: 'NCB'
   },
   {
      label: 'Ngân hàng Á Châu - ACB',
      value: 'ACB'
   },
   {
      label: 'Ngân hàng VietinBank - VTB',
      value: 'VTB'
   },

   {
      label: 'Ngân hàng Vietcombank - VCB',
      value: 'VCB'
   },
   {
      label: 'Đầu tư và Phát triển Việt Nam - BIDV',
      value: 'BIDV'
   },
   {
      label: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn - Agribank',
      value: 'Agribank'
   }
];
