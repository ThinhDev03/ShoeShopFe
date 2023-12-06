import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

yup.setLocale({
   mixed: {
      notType: '${path} is required'
   }
});

const yupVoucher = yup.object().shape({
   voucher_name: yup
      .string()
      .trim('Vui lòng bỏ khoảng trống ')
      .strict(true)
      .required('Vui lòng nhập tên voucher ')
      .default(''),
   point_discount: yup
      .string()
      .trim('Vui lòng bỏ khoảng trống')
      .strict(true)
      .required('Vui lòng nhập điều kiện giảm giá ')
      .matches(Regex.number, 'Điều kiện giảm giá phải là số ')
      .default(''),
   discount: yup
      .string()
      .trim('Vui lòng bỏ khoảng trống')
      .strict(true)
      .required('Vui lòng nhập số tiền giảm')
      .matches(Regex.number, 'Số tiền giảm phải là số ')
      .default('')
});
export default yupVoucher;
