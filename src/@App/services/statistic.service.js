import { default as BaseService } from '@Core/Api/BaseService';

class StatisticService extends BaseService {
   BASE_ENDPOINT = '/statistic';

   constructor(params) {
      super(params);
      this.setRequest();
   }

   getBestSeller() {
      return this.find('best-seller');
   }
   getRevenueAll() {
      return this.find('revenue-all');
   }
   getTopRate() {
      return this.find('top-rate');
   }
   getRevenue() {
      return this.find('revenue');
   }
}

const statisticService = new StatisticService();
export default statisticService;
