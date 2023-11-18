import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

export const schemaProfile = yup.object().shape({
   fullname: yup.string().required('Tài khoản đăng nhập không được để trống'),
   username: yup.string().required('Tài khoản đăng nhập không được để trống'),
   email: yup.string().required('Email không được để trống').matches(Regex.email, 'Email không đúng định dạng'),
   phone: yup.number().required('Số điện thoại không được để trống'),
   address: yup.string().required('Địa chỉ không được để trống'),
   gender: yup.string()
});
