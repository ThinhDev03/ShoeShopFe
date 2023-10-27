import { default as BaseService } from '@Core/Api/BaseService';

class SizeService extends BaseService {
   BASE_ENDPOINT = '/size';

   constructor(params) {
      super(params);
      this.setRequest();
   }

   createSize(data) {
      return this.create(data);
   }

   getAll() {
      return this.request(this.BASE_ENDPOINT);
   }

   deleteSize(id) {
      return this.delete(id);
   }

   getOne(id) {
      return this.find(id);
   }

   updateOne(data, id, method = 'post') {
      return this.update(data, id, method);
   }
}

const sizeService = new SizeService();
export default sizeService;
