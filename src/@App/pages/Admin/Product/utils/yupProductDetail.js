import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

const yupProductDetail = yup.object().shape({
   size_id: yup.string().required('Vui lòng chọn').default(''),
   color_id: yup.string().required('Vui lòng chọn').default(''),
   quantity: yup.string().required('Vui lòng chọn').matches(Regex.number, 'Số lượng phải là số').default(''),
   price: yup.string().required('Vui lòng chọn').matches(Regex.number, 'Giá sản phẩm phải là số').default(''),
   sale: yup
      .string()

      .matches(Regex.number, 'Giá khuyến mãi phải là số')
      .test('is-in-range', 'Giá khuyến mãi phải từ 1 đến 100', (value) => {
         if (value === '') {
            return true;
         }

         const numericValue = parseInt(value, 10);
         return numericValue >= 1 && numericValue <= 100;
      })
      .default(''),
   image_id: yup.string().strict(true).required('Vui lòng chọn').default('')
});

const yupDetail = yup.object().shape({
   details: yup.array().of(yupProductDetail)
});

export default yupDetail;
