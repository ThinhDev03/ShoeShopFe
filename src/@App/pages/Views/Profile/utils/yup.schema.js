import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

export const schemaProfile = yup.object().shape({
   fullname: yup
      .string()
      .required('Tài khoản đăng nhập không được để trống')
      .matches(/^\S.*\S$/, 'Không được nhập khoảng trắng ở đầu hoặc cuối chuỗi'),
   username: yup
      .string()
      .required('Tài khoản đăng nhập không được để trống')
      .matches(/^\S.*\S$/, 'Không được nhập khoảng trắng ở đầu hoặc cuối chuỗi'),
   email: yup.string().required('Email không được để trống').matches(Regex.email, 'Email không đúng định dạng'),
   phone: yup.number().required('Số điện thoại không được để trống'),
   address: yup
      .string()
      .required('Địa chỉ không được để trống')
      .matches(/^\S.*\S$/, 'Không được nhập khoảng trắng ở đầu hoặc cuối chuỗi'),
   gender: yup.string()
});
