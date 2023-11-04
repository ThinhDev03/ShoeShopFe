import BaseService from '@Core/Api/BaseService';

class CartService extends BaseService {
   BASE_ENDPOINT = 'cart';

   constructor(params) {
      super(params);
      this.setRequest();
   }

   getCart(user_id) {
      return this.request.get(this.BASE_ENDPOINT + '/' + user_id);
   }

   createBrand(data) {
      return this.create(data);
   }

   deleteBrand(id) {
      return this.delete(id);
   }

   getOne(id) {
      return this.find(id);
   }

   updateOne(data, id, method = 'post') {
      return this.update(data, id, method);
   }
}

const cartService = new CartService();
export default cartService;
