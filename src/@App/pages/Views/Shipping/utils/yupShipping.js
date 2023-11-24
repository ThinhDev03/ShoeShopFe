import Regex from '@Core/Helper/Regex';
import * as yup from 'yup';
import { payment_methods } from '.';

yup.setLocale({
   mixed: {
      notType: '${path} is required'
   }
});

const schemaShipping = yup.object({
   receiver: yup.string().required('Tài khoản đăng nhập không được để trống').default(''),
   phone_number: yup
      .string()
      .required('Số điện thoại không được để trống')
      .matches(Regex.phone, 'Số điện thoại không hợp lệ')
      .default(''),
   province: yup.string().required('Tỉnh / thành phố không được để trống').default(''),
   district: yup.string().required('Quận / huyện không được để trống').default(''),
   ward: yup.string().required('Xã phường không được để trống').default(''),
   address: yup.string().required('Địa chỉ không được để trống').default(''),
   payment_method: yup.string().required('Hình thức thanh toán không được để trống').default(payment_methods[0].value),
   note: yup.string().default('')
});

export default schemaShipping;
