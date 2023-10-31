import { default as BaseService } from '@Core/Api/BaseService';

class ProductDetailService extends BaseService {
   BASE_ENDPOINT = '/product';

   constructor(params) {
      super(params);
      this.setRequest();
   }

   createProductDetail(data) {
      return this.request.post(this.BASE_ENDPOINT + '/create-detail', data);
   }

   getAll() {
      return this.request(this.BASE_ENDPOINT);
   }

   deleteProductDetail(id) {
      return this.request.delete(this.BASE_ENDPOINT + '/remove-detail/' + id);
   }

   getOne(id) {
      return this.request.get(this.BASE_ENDPOINT + '/detail/' + id);
   }

   updateOne(data, id, method = 'post') {
      return this.update(data, id, method);
   }
}

const productDetailService = new ProductDetailService();
export default productDetailService;
