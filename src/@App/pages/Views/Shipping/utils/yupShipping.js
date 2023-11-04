import Regex from '@Core/Helper/Regex';
import * as yup from 'yup';
import { payment_method } from '.';

yup.setLocale({
   mixed: {
      notType: '${path} is required'
   }
});

const schemaShipping = yup.object({
   receiver: yup.string().required('Tài khoản đăng nhập không được để trống'),
   phone_number: yup.number().required('Số điện thoại không được để trống'),
   //    province: yup.string().required('Tỉnh / thành phố không được để trống'),
   //    district: yup.string().required('Quận / huyện không được để trống'),
   //    ward: yup.string().required('Xã phường không được để trống'),
   address: yup.string().required('Địa chỉ không được để trống'),
   payment_method: yup.string().required('Hình thức thanh toán không được để trống').default(payment_method[0].value),
   note: yup.string()
});

export default schemaShipping;