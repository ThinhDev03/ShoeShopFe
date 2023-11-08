import BaseService from '@Core/Api/BaseService';

class CategoryService extends BaseService {
   BASE_ENDPOINT = '/category';

   constructor( params ) {
      super(params);
      this.setRequest();
   }

   createCategory(data) {
      return this.create(data);
   }

   getAll() {
      return this.request(this.BASE_ENDPOINT);
   }

   deleteCategory(id) {
      return this.delete(id);
   }

   getOne(id) {
      return this.find(id);
   }

   updateOne(data, id, method = 'post') {
      return this.update(data, id, method);
   }
}

const categoryService = new CategoryService();
export default categoryService;
