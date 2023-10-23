import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

yup.setLocale({
   mixed: {
      notType: '${path} is required'
   }
});

const yupProduct = yup.object().shape({
   name: yup.string().trim('Vui lòng bỏ khoảng trống').strict(true).required('Vui lòng nhập tên màu').default(''),
   category_id: yup.string().trim('Vui lòng bỏ khoảng trống').strict(true).required('Không được để trống').default(''),
   brand_id: yup.string().trim('Vui lòng bỏ khoảng trống').strict(true).required('Vui lòng nhập mã màu').default(''),
   description: yup
      .string()
      .required()
      .trim('Vui lòng bỏ khoảng trống')
      .strict(true)
      .required('Không được để trống')
      .default(''),
   thumbnail: yup.string().trim('Vui lòng bỏ khoảng trống').strict(true).required('Không được để trống').default(''),
   images: yup.array().required().default('')
});

export default yupProduct;
