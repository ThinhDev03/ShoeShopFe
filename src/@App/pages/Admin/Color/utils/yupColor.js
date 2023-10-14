import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

yup.setLocale({
   mixed: {
      notType: '${path} is required'
   }
});
const yupClasses = yup.object().shape({
   color_name: yup
      .string()
      .trim('Vui lòng bỏ khoảng trống')
      .strict(true)
      .required('Vui lòng nhập tên màu')
      .default(''),
   headTeacher: yup
      .string()
      .trim('Vui lòng bỏ khoảng trống')
      .strict(true)
      .default(''),
   color_code: yup
      .string()
      .trim('Vui lòng bỏ khoảng trống')
      .strict(true)
      .required('Vui lòng nhập mã màu')
      .default('')
});
export default yupClasses;
