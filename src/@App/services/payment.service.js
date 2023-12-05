import BaseService from '@Core/Api/BaseService';

class PaymentService extends BaseService {
   BASE_ENDPOINT = 'payment'; // Thay đổi base endpoint tại đây

   constructor(params) {
      super(params);
      this.setRequest(); //  Khởi tạo request (tạo insatance) chi tiết tahi baseServie
   }

   getUrlPayment() {
      return this.BASE_URL + '/' + this.BASE_ENDPOINT;
   }
   savePayment(params) {
      return this.request.get(this.BASE_URL + '/' + this.BASE_ENDPOINT + '/save', { params });
   }
};
const paymentService = new PaymentService();
export default paymentService;
