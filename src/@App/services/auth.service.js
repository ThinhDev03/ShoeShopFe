import BaseService from '@Core/Api/BaseService';

export const authEndpoint = {
   base: 'auth',
   login: 'login',
   register: 'register',
   signout: 'signout',
   getUser: 'verify-token',
   getOne: 'get-detail',
   locked: 'lock',
   refestToken: 'refresh-token'
};

class AuthService extends BaseService {
   BASE_ENDPOINT = authEndpoint.base;

   constructor(params) {
      super(params);
      this.setRequest();
   }

   login(data) {
      return this.request.post(this.BASE_ENDPOINT + '/' + authEndpoint.login, data);
   }
   locked(id, is_locked) {
      return this.request.put(this.BASE_ENDPOINT + '/' + authEndpoint.locked + '/' + id, { is_locked });
   }

   register(data) {
      return this.request.post(this.BASE_ENDPOINT + '/' + authEndpoint.register, data);
   }

   createEmployee(data) {
      return this.request.post(this.BASE_ENDPOINT + '/' + authEndpoint.register, { ...data, role: 'EMPLOYEE' });
   }

   signout() {
      return this.find(authEndpoint.signout);
   }

   getCurrentUser() {
      return this.find(authEndpoint.getUser);
   }

   getUserById(id) {
      return this.find(authEndpoint.getOne + '/' + id);
   }

   refeshToken() {
      return this.find(authEndpoint.refestToken);
   }

   updateUser(id, data) {
      return this.request.post(this.BASE_ENDPOINT + '/' + 'update/' + id, data);
   }
}

const authService = new AuthService();

export default authService;
