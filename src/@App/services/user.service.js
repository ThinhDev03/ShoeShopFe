import BaseService from '@Core/Api/BaseService';

const userEndpoint = {
   base: '/user'
};
class UserService extends BaseService {
   BASE_ENDPOINT = userEndpoint.base; // Thay đổi base endpoint tại đây

   constructor(params) {
      super(params);
      this.setRequest(); //  Khởi tạo request (tạo instance) chi tiết tại baseService
   }
}

const userService = new UserService();
export default userService;
