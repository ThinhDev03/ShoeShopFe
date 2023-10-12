import BaseService from '@Core/Api/BaseService';

class PermissionService extends BaseService {
   BASE_ENDPOINT = 'permissions'; // Thay đổi base endpoint tại đây

   constructor(params) {
      super(params);
      this.setRequest(); //  Khởi tạo request (tạo insatance) chi tiết tahi baseServie
   }
   getPermissionByRole(params) {
      return this.request.get('/permissions/get-by-role', { params });
   }
}

const permissionService = new PermissionService();
export default permissionService;
