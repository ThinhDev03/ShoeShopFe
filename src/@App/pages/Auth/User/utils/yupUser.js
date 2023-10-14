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
      .matches(Regex.email)
      .required('Vui lòng nhập địa chỉ email'),

   phone: yup.string().trim().matches(Regex.phone, 'Số điện thoại không hợp lệ').required('Vui lòng nhập số ĐT'),
   displayName: yup.string().trim().required('Vui lòng nhập tên hiển thị'),
   dateOfBirth: yup.date().required('Vui lòng nhập ngày sinh').default(Date.now()),
   gender: yup
      .string()
      .required('Vui lòng chọn giới tính')
      .oneOf(['Nam', 'Nữ'], 'Vui lòng chọn lựa chọn hợp lệ')
      .default(''),
   eduBackground: yup
      .object()
      .shape({
         qualification: yup.string().required('Vui lòng nhập trình độ học vấn/nghề nghiệp').trim(),
         universityName: yup.string().required('Vui lòng nhập tên trường đã tốt nghiệp').trim(),
         graduatedAt: yup.date().required('Vui lòng nhập ngày tốt nghiệp')
      })
      .required('Education background is required')
});
export default yupUser;
