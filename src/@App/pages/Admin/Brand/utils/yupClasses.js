import * as yup from 'yup';

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
    origin: yup
        .string()
        .trim('Vui lòng bỏ khoảng trống')
        .strict(true)
        .required('Vui lòng nhập tên nguồn gốc')
        .default(''),
    description: yup
        .string()
        .trim('Vui lòng bỏ khoảng trống')
        .strict(true)
        .default(''),
});
export default yupClasses;
