import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

yup.setLocale({
<<<<<<< HEAD
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
    password: yup.string().required('Mật khẩu không được để trống')
=======
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
   password: yup.string().required('Mật khẩu không được để trống')
>>>>>>> 6c1eb1d60cc13036287f8f7bd7ace79c0b601509
});

export default schemaRegister;
