import BaseService from '@Core/Api/BaseService';

const userEndpoint = {
   base: '/user',
   createTeacher: '/create-teacher-account',
   updateUser: '/update-user',
   getTeacher: '/users/teachers',
   getParent: '/users/parent'
};
class UserService extends BaseService {
   BASE_ENDPOINT = userEndpoint.base; // Thay đổi base endpoint tại đây

   constructor(params) {
      super(params);
      this.setRequest(); //  Khởi tạo request (tạo instance) chi tiết tại baseService
   }

   createTeacher(data) {
      this.BASE_ENDPOINT = userEndpoint.createTeacher;
      return this.create(data);
   }

   updateUser(data, ID, method) {
      this.BASE_ENDPOINT = userEndpoint.updateUser;
      return this.update(data, ID, method);
   }

   getTeacher(query = {}) {
      this.BASE_ENDPOINT = userEndpoint.getTeacher;
      return this.list(query);
   }

   getParent(id) {
      this.BASE_ENDPOINT = userEndpoint.getParent;
      return this.find(id);
   }
}

const userService = new UserService();
export default userService;
