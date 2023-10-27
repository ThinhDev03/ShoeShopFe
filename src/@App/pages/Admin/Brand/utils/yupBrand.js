import * as yup from 'yup';

yup.setLocale({
   mixed: {
      notType: '${path} is required'
   }
});
const yupBrand = yup.object().shape({
   brand_name: yup
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
   description: yup.string().trim('Vui lòng bỏ khoảng trống').strict(true).default('').required('Vui lòng nhập mô tả')
});
export default yupBrand;
