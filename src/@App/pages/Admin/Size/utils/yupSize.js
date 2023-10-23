import * as yup from 'yup';
import Regex from '@Core/Helper/Regex';

yup.setLocale({
    mixed: {
        notType: '${path} is required'
    }
});
const yupSize = yup.object().shape({
    size_name: yup.string().trim('Vui lòng bỏ khoảng trống').strict(true).required('Vui lòng nhập Size').default(''),
    description: yup.string().trim('Vui lòng bỏ khoảng trống').strict(true).required('Vui lòng nhập mô tả').default('')
});
export default yupSize;
