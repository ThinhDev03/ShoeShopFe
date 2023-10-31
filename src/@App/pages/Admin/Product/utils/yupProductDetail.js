import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

yup.setLocale({
   mixed: {
      notType: '${path} is required'
   }
});
const yupProductDetail = yup.object().shape({
   size_id: yup.string().trim('Bỏ khoảng trống').strict(true).required('Vui lòng chọn').default(''),
   color_id: yup.string().trim('Bỏ khoảng trống').strict(true).required('Vui lòng chọn').default(''),
   quantity: yup
      .string()
      .trim('Bỏ khoảng trống')
      .strict(true)
      .required('Vui lòng chọn')
      .matches(Regex.number, 'Số lượng phải là số')
      .default(''),
   price: yup
      .string()
      .trim('Bỏ khoảng trống')
      .strict(true)
      .required('Vui lòng chọn')
      .matches(Regex.number, 'Giá sản phẩm phải là số')
      .default(''),
   sale: yup
      .string()
      .trim('Bỏ khoảng trống')
      .matches(Regex.number, 'Giá khuyến mãi phải là số')
      .strict(true)
      .default(''),
   image_id: yup.string().strict(true).required('Vui lòng chọn').default('')
});

const yupDetail = yup.object().shape({
   // productDetail: yup.string().strict(true).default(''),
   details: yup.array().of(yupProductDetail)
});

export default yupDetail;
