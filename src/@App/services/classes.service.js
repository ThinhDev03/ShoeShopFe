import BaseService from '@Core/Api/BaseService';

class ClassesService extends BaseService {
   BASE_ENDPOINT = '/classes'; // Thay đổi base endpoint tại đây

   constructor(params) {
      super(params);
      this.setRequest();
   }

   getAll() {
      return this.request(this.BASE_ENDPOINT);
   }
}

const classesService = new ClassesService();
export default classesService;
