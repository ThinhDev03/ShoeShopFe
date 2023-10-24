import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

yup.setLocale({
   mixed: {
      notType: '${path} is required'
   }
});

const yupCard = yup.object().shape({
   color_id: yup.string().strict(true).required('Vui lòng chọn màu').default(''),
   size_id: yup.string().strict(true).required('Vui lòng chọn size').default(''),
   quantity: yup.string().strict(true).required('Vui lòng nhập vào số lượng').default('')
});

export default yupCard;
