import BaseService from '@Core/Api/BaseService';

export const authEndpoint = {
   base: 'auth',
   login: 'login',
   register: 'register',
   signout: 'signout',
   getUser: 'verify-token',
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

   register(data) {
      return this.request.post(this.BASE_ENDPOINT + '/' + authEndpoint.register, data);
   }

   signout() {
      return this.find(authEndpoint.signout);
   }

   getCurrentUser() {
      return this.find(authEndpoint.getUser);
   }

   refeshToken() {
      return this.find(authEndpoint.refestToken);
   }
}

const authService = new AuthService();
export default authService;
