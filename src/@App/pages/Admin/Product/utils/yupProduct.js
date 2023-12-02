import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

const yupProduct = yup.object().shape({
   name: yup.string().trim('Vui lòng bỏ khoảng trống').strict(true).required('Vui lòng nhập tên sản phẩm').default(''),
   category_id: yup
      .string()
      .trim('Vui lòng bỏ khoảng trống')
      .strict(true)
      .required('Vui lòng nhập danh mục')
      .default(''),
   brand_id: yup
      .string()
      .trim('Vui lòng bỏ khoảng trống')
      .strict(true)
      .required('Vui lòng nhập thương hiệu')
      .default(''),
   description: yup.string().trim('Vui lòng bỏ khoảng trống').strict(true).required('Không được để trống').default(''),
   thumbnail: yup.string().trim('Vui lòng bỏ khoảng trống').required('Không được để trống').default(''),
   images: yup.array().required('Không được để trống').default([]),
   newImages: yup.array().default([])
});

export default yupProduct;
