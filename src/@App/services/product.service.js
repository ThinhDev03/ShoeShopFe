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

   createImage(data) {
      return this.request.post(this.BASE_ENDPOINT + '/create-image', data);
   }

   addImage(id, data) {
      return this.request.post(this.BASE_ENDPOINT + '/add-image/' + id, data);
   }

   getAll() {
      return this.request.get(this.BASE_ENDPOINT);
   }

   getImageProduct(id) {
      return this.request.get(this.BASE_ENDPOINT + '/images/' + id);
   }

   deleteProduct(id) {
      return this.delete(id);
   }

   deleteImage(id) {
      return this.request.delete(this.BASE_ENDPOINT + `/remove-image/${id}`);
   }
   deleteThumbnail(id) {
      return this.request.put(this.BASE_ENDPOINT + `/delete-thumbnail/${id}`);
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
