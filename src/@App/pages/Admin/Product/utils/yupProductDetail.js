import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

yup.setLocale({
   mixed: {
      notType: '${path} is required'
   }
});
const yupProductDetail = yup.object().shape({
   variation: yup.array().of(
      yup
         .object()
         .shape({
            size_id: yup
               .string()
               .trim('Vui lòng bỏ khoảng trống')
               .strict(true)
               .required('Vui lòng chọn size')
               .default(''),
            color_id: yup
               .string()
               .trim('Vui lòng bỏ khoảng trống')
               .strict(true)
               .required('Không được để trống màu')
               .default(''),
            quantity: yup
               .string()
               .trim('Vui lòng bỏ khoảng trống')
               .strict(true)
               .required('Số lượng không được để trống')
               .matches(Regex.number, 'Số lượng phải là số')
               .default(''),
            price: yup
               .string()
               .trim('Vui lòng bỏ khoảng trống')
               .strict(true)
               .required('Giá bán không được để trống')
               .matches(Regex.number, 'Giá sản phẩm phải là số')
               .default(''),
            sale: yup.string().trim('Vui lòng bỏ khoảng trống').matches(Regex.number, 'Giá khuyến mãi phải là số').strict(true).default(''),
            image_id: yup
               .string()
               .trim('Vui lòng bỏ khoảng trống')
               .strict(true)
               .required('Hình ảnh không được để trống')
               .default('')
         })
         .default(null)
   )
});
export default yupProductDetail;
