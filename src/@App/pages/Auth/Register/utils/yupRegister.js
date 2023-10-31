import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

yup.setLocale({
   mixed: {
      notType: '${path} is required'
   }
});

const schemaRegister = yup.object({
   fullname: yup.string().required('Tài khoản đăng nhập không được để trống'),
   username: yup.string().required('Tài khoản đăng nhập không được để trống'),
   email: yup.string().required('Email không được để trống').matches(Regex.email, 'Email không đúng định dạng'),
   phone: yup.number().required('Số điện thoại không được để trống'),
   address: yup.string().required('Địa chỉ không được để trống'),
   password: yup
      .string()
      .required('Mật khẩu không được để trống')
      .matches(Regex.password, 'Vui lòng nhập số, chữ hoa, chữ thường, ký tự đặc biệt'),
   confirmPassword: yup
      .string()
      .trim()
      .required('Vui lòng nhập lại mật khẩu')
      .oneOf([yup.ref('password')], 'mật khẩu không trùng khớp')
});

export default schemaRegister;
