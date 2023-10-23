import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

yup.setLocale({
    mixed: {
        notType: '${path} is required'
    }
});
const yupClasses = yup.object().shape({
    category_name: yup
        .string()
        .trim('Vui lòng bỏ khoảng trống')
        .strict(true)
        .required('Vui lòng nhập tên danh mục')
        .default(''),
    description: yup
        .string()
        .trim('Vui lòng bỏ khoảng trống')
        .strict(true)
        .required('Vui lòng nhập phần mô tả')
        .default(''),
});
export default yupClasses;
