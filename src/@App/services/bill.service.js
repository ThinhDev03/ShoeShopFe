import BaseService from '@Core/Api/BaseService';

class BillService extends BaseService {
   BASE_ENDPOINT = '/bill';

   constructor(params) {
      super(params);
      this.setRequest();
   }
   async updateStatus(id, status) {
      console.log(status);

      return this.request.put(this.BASE_ENDPOINT + '/update-status' + '/' + id, { status });
   }
}

const billService = new BillService();
export default billService;
