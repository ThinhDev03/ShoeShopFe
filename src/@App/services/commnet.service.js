import BaseService from '@Core/Api/BaseService';

class CommentService extends BaseService {
   BASE_ENDPOINT = 'comment';

   constructor(params) {
      super(params);
      this.setRequest();
   }
}

const commentService = new CommentService();
export default commentService;
