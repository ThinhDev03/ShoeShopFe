import BaseService from '@Core/Api/BaseService';

class VoucherService extends BaseService {
   BASE_ENDPOINT = '/voucher';

   constructor(params) {
      super(params);
      this.setRequest();
   }
}

const voucherService = new VoucherService();

export default voucherService;
