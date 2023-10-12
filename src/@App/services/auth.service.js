import BaseService from '@Core/Api/BaseService';

export const authEndpoint = {
   base: 'auth',
   signin: 'google',
   signout: 'signout',
   getUser: 'user',
   refestToken: 'refresh-token'
};

class AuthService extends BaseService {
   BASE_ENDPOINT = authEndpoint.base;

   constructor(params) {
      super(params);
      this.setRequest();
   }
   signin() {
      return this.BASE_URL + '/' + this.BASE_ENDPOINT + '/' + authEndpoint.signin;
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
