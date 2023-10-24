import { default as BaseService } from '@Core/Api/BaseService';

class ProductService extends BaseService {
   BASE_ENDPOINT = '/product';

   constructor(params) {
      super(params);
      this.setRequest();
   }

   createProduct(data) {
      return this.create(data);
   }

   getAll() {
      return this.request(this.BASE_ENDPOINT);
   }

   getImageProduct(id) {
      return this.request(this.BASE_ENDPOINT + '/images/' + id);
   }

   deleteProduct(id) {
      return this.delete(id);
   }

   getOne(id) {
      return this.find(id);
   }

   updateOne(data, id, method = 'post') {
      return this.update(data, id, method);
   }
}

const productService = new ProductService();
export default productService;
