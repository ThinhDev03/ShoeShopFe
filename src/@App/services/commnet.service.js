import BaseService from '@Core/Api/BaseService';

class CommentService extends BaseService {
   BASE_ENDPOINT = 'comment';

   constructor(params) {
      super(params);
      this.setRequest();
   }

   async createComment(body) {
      this.request.post(this.BASE_ENDPOINT + '/create', body);
   }
}

const commentService = new CommentService();
export default commentService;
