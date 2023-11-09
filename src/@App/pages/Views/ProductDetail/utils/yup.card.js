import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

yup.setLocale({
   mixed: {
      notType: '${path} is required'
   }
});

const yupCart = yup.object().shape({
   product_id: yup.string().strict(true).required('Vui lòng chọn size').default(''),
   quantity: yup.number().required('Vui lòng nhập vào số lượng')
});

export default yupCart;
