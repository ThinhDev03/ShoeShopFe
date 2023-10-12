import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

yup.setLocale({
   mixed: {
      notType: '${path} is required'
   }
});
const yupClasses = yup.object().shape({
   className: yup
      .string()
      .trim('Vui lòng bỏ khoảng trống')
      .strict(true)
      .required('Vui lòng nhập tên lớp')
      .matches(Regex.className, 'Tên lớp không hợp lệ')
      .default(''),
   headTeacher: yup
      .string()
      .trim('Vui lòng bỏ khoảng trống')
      .strict(true)
      .required('Vui lòng nhập tên giáo viên chủ nhiệm')
      .default(''),
   grade: yup.string().required('Vui lòng chọn cấp học').default('1')
});
export default yupClasses;
