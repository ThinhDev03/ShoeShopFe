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

export const payment_method = [
   {
      label: 'Thanh toán bằng Thẻ quốc tế / Thẻ nội địa / QR Code     ',
      value: 'PAYMENT_ON_DELIVEY'
   },
   {
      label: 'Thanh toán trực tiếp khi giao hàng     ',
      value: 'PAYMENT_IN_ADVANCE'
   }
];
