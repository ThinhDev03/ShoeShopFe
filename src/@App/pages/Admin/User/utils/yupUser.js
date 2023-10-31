import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

yup.setLocale({
   mixed: {
      notType: '${path} is required'
   }
});

const yupUser = yup.object().shape({
   email: yup
      .string()
      .trim()
      .email('Địa chỉ email không hợp lệ')
      .matches(Regex.email, 'Vui lòng nhập đúng email')
      .required('Vui lòng nhập địa chỉ email'),
   phone: yup.string().trim().matches(Regex.phone, 'Số điện thoại không hợp lệ').required('Vui lòng nhập số ĐT'),
   fullname: yup.string().trim().required('Vui lòng nhập tên hiển thị'),
   username: yup.string().trim().required('Vui lòng nhập tên đăng nhập'),
   password: yup
      .string()
      .trim()
      .required('Vui lòng nhập mật khẩu')
      .matches(Regex.password, 'Vui lòng nhập số, chữ hoa, chữ thường, ký tự đặc biệt'),
   confirmPassword: yup
      .string()
      .trim()
      .required('Vui lòng xác nhận mật khẩu')
      .oneOf([yup.ref('password')], 'mật khẩu không trùng khớp'),

   address: yup.string().trim().required('Vui lòng nhập địa chỉ'),
   gender: yup.string().trim().required('Vui lòng chọn giới tính')
});
export default yupUser;
