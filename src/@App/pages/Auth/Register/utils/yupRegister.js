import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

yup.setLocale({
   mixed: {
      notType: '${path} is required'
   }
});

const schemaRegister = yup.object({
   fullname: yup
      .string()
      .required('Họ và tên không được để trống')
      .matches(/^\S.*\S$/, 'Nhập ít nhất 2 chữ cái, không nhập khoảng trắng ở đầu hoặc cuối.'),
   username: yup
      .string()
      .required('Tên đăng nhập không được để trống')
      .matches(/^\S.*\S$/, 'Nhập ít nhất 2 chữ cái, không nhập khoảng trắng ở đầu hoặc cuối.'),
   email: yup.string().required('Email không được để trống').matches(Regex.email, 'Email không đúng định dạng'),
   phone: yup.string().required('Số điện thoại không được để trống').matches(Regex.phone, 'Số điện thoại không hợp lệ'),
   address: yup
      .string()
      .required('Địa chỉ không được để trống')
      .matches(/^\S.*\S$/, 'Nhập ít nhất 2 chữ cái, không nhập khoảng trắng ở đầu hoặc cuối.'),
   password: yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu phải lớn hơn 6 ký tự'),
   // .matches(Regex.password, 'Vui lòng nhập số, chữ hoa, chữ thường, ký tự đặc biệt'),
   gender: yup.string().required('Vui lòng chọn giới tính'),
   confirmPassword: yup
      .string()
      .trim()
      .required('Vui lòng nhập lại mật khẩu')
      .oneOf([yup.ref('password')], 'mật khẩu không trùng khớp')
});

export default schemaRegister;
